import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    makeStyles,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@material-ui/core';
import { Add, Save } from '@material-ui/icons';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { types } from '../../../../../../assets';
import {
    CONSTRUCTED_RESPONSE,
    INVALID_OPTIONS,
    OPTIONS_NOT_ENOUGH,
    OPTIONS_NOT_MATCH_CORRECT_ANSWERS,
    SELECTED_RESPONSE,
} from '../../../../../../constant';
import { saveQuestion } from '../../../../../../redux/reducers/createPractice.reducer';
import {
    convertCorrectAnswerToList,
    validateOptionList,
} from '../../../../../../utils';
import { questionSchema } from '../../../../../../validateSchemas';
import CreateOption from './CreateOption';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
    },
    questionHeading: {
        backgroundColor: theme.palette.primary.light,
        color: '#fff',
    },
    details: {
        display: 'flex',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
    },
    formField: {
        width: '100%',
        margin: '16px 0',
    },
    btn: {
        backgroundColor: theme.palette.success.main,
    },
    optionsContainer: {
        width: 450,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    errorText: {
        margin: theme.spacing(2),
    },
}));

const CreateQuestionForm = ({ id, saved }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(questionSchema),
    });
    const [optionList, setOptionList] = useState([{ id: uuidv4(), value: '' }]);
    const [type, setType] = useState(CONSTRUCTED_RESPONSE);
    const [optionsError, setOptionError] = useState({
        isError: false,
        message: '',
    });
    const handleTypeChange = (e) => {
        setType(() => e.target.value);
    };
    const handleAddOption = () => {
        setOptionList((options) => {
            return [...options, { id: uuidv4(), value: '' }];
        });
    };
    const handleOptionChange = (e, id) => {
        setOptionError({ isError: false, message: '' });
        setOptionList((options) => {
            const optionUpdated = options.map((option) => {
                if (option.id === id) {
                    return (option = { ...option, value: e.target.value });
                }
                return option;
            });
            return optionUpdated;
        });
    };
    const handleRemoveOption = (id) => {
        setOptionList((options) => {
            return options.filter((option) => option.id !== id);
        });
    };
    const saveQuestionHandler = (data) => {
        try {
            convertCorrectAnswerToList(data);
            data.type = type;
            data.id = id;
            if (data.type === SELECTED_RESPONSE) {
                const options = validateOptionList(
                    optionList,
                    data.correctAnswers
                );
                data.options = options;
            }
            if (data.type === CONSTRUCTED_RESPONSE) {
                data.options = undefined;
            }
            dispatch(saveQuestion(data));
        } catch (error) {
            if (error.type === INVALID_OPTIONS) {
                setOptionError((prev) => {
                    return { ...prev, isError: true, message: error.message };
                });
            }
        }
    };
    return (
        <>
            <form
                className={classes.form}
                onSubmit={handleSubmit(saveQuestionHandler)}
            >
                <Controller
                    name='demand'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.formField}
                            variant='outlined'
                            label='Y??u c???u c???a c??u h???i'
                            placeholder='eg:H??y ch???n ????p ??n ????ng,etc'
                            error={!!errors.demand}
                            helperText={errors.demand && errors.demand.message}
                            InputProps={{
                                readOnly: saved,
                            }}
                        />
                    )}
                />
                <Controller
                    name='question'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.formField}
                            variant='outlined'
                            label='C??u h???i'
                            error={!!errors.question}
                            helperText={
                                errors.question && errors.question.message
                            }
                            InputProps={{
                                readOnly: saved,
                            }}
                        />
                    )}
                />

                <FormControl className={classes.formField} component='fieldset'>
                    <FormLabel component='legend'>Lo???i c??u h???i</FormLabel>
                    <RadioGroup
                        aria-label='type'
                        name='type'
                        value={type}
                        onChange={handleTypeChange}
                    >
                        {types.map((type) => {
                            return (
                                <FormControlLabel
                                    key={type.value}
                                    value={type.value}
                                    control={<Radio />}
                                    label={type.vnm}
                                    disabled={saved}
                                />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
                {type === 'selected-response' && (
                    <div className={classes.optionsContainer}>
                        {optionList.map((option) => {
                            return (
                                <CreateOption
                                    key={option.id}
                                    id={option.id}
                                    handleRemoveOption={handleRemoveOption}
                                    handleOptionChange={handleOptionChange}
                                    saved={saved}
                                />
                            );
                        })}

                        <Button
                            className={classes.btn}
                            variant='contained'
                            startIcon={<Add />}
                            onClick={handleAddOption}
                            disabled={saved}
                        >
                            Th??m s??? l???a ch???n
                        </Button>
                        {optionsError.isError && (
                            <Typography
                                className={classes.errorText}
                                component='h6'
                                color='error'
                            >
                                {optionsError.message ===
                                    OPTIONS_NOT_MATCH_CORRECT_ANSWERS &&
                                    'M???t trong nh???ng l???a ch???n ph???i tr??ng v???i ????p ??n'}
                                {optionsError.message === OPTIONS_NOT_ENOUGH &&
                                    'Ph???i c?? ??t nh???t 2 s??? l???a ch???n'}
                            </Typography>
                        )}
                    </div>
                )}
                <Controller
                    name='correctAnswers'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.formField}
                            variant='outlined'
                            label='????p ??n ????ng'
                            error={!!errors.correctAnswers}
                            helperText={
                                (errors.correctAnswers &&
                                    errors.correctAnswers.message) ||
                                'N???u c?? nhi???u ????p ??n h??y c??ch nhau b???ng d???u ";"'
                            }
                            InputProps={{
                                readOnly: saved,
                            }}
                        />
                    )}
                />

                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='small'
                    startIcon={<Save />}
                    disabled={saved}
                >
                    L??u
                </Button>
            </form>
        </>
    );
};

export default CreateQuestionForm;
