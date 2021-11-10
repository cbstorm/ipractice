import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { categories, levels, sharings } from '../../../../../../assets';
import {
    createHeader,
    createPracticeSelector,
} from '../../../../../../redux/reducers/createPractice.reducer';
import { practiceSchema } from '../../../../../../validateSchemas';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        width: '50%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    formField: {
        width: '100%',
        marginBottom: theme.spacing(4),
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export default function CreateInitForm({ handleNext }) {
    const classes = useStyles();

    const { classId } = useParams();
    const dispatch = useDispatch();
    const { title, category, level, sharing, timeLimited, limitTime } =
        useSelector(createPracticeSelector);
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(practiceSchema),
    });

    const [isChecked, setChecked] = useState(limitTime);

    const switchChangeHandler = () => {
        setChecked((prev) => {
            const newState = !prev;
            setValue('limitTime', newState);
            return newState;
        });
    };

    const submitHandler = (data) => {
        if (data.limitTime === false) {
            data = { ...data, timeLimited: 0 };
        }
        dispatch(createHeader(data));
        handleNext();
    };

    useEffect(() => {
        setValue('classId', undefined);
        setValue('sharing', sharing);
        if (classId) {
            setValue('sharing', 'CLASS');
            setValue('classId', classId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classId]);

    return (
        <Container className={classes.root}>
            <form
                className={classes.form}
                onSubmit={handleSubmit(submitHandler)}
            >
                <Controller
                    name='title'
                    control={control}
                    defaultValue={title}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.formField}
                            label='Tiêu đề'
                            variant='outlined'
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    )}
                />
                <Controller
                    name='category'
                    control={control}
                    defaultValue={category}
                    render={({ field }) => (
                        <FormControl
                            variant='outlined'
                            className={classes.formField}
                        >
                            <InputLabel id='category-label'>
                                Thể loại
                            </InputLabel>
                            <Select
                                {...field}
                                labelId='category-label'
                                id='demo-simple-select'
                                label='Thể loại'
                                error={!!errors.category}
                            >
                                {categories.map((category) => {
                                    return (
                                        <MenuItem
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.vnm}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    )}
                />
                <Controller
                    name='level'
                    control={control}
                    defaultValue={level}
                    render={({ field }) => (
                        <FormControl
                            variant='outlined'
                            className={classes.formField}
                        >
                            <InputLabel id='level-label'>Độ khó</InputLabel>
                            <Select
                                {...field}
                                labelId='level-label'
                                label='Độ khó'
                                error={!!errors.level}
                            >
                                {levels.map((level) => {
                                    return (
                                        <MenuItem
                                            key={level.value}
                                            value={level.value}
                                        >
                                            {level.vnm}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    )}
                />

                <FormControlLabel
                    className={classes.formField}
                    control={
                        <Switch
                            checked={isChecked}
                            onChange={switchChangeHandler}
                        />
                    }
                    label='Giới hạn thời gian làm bài'
                />

                {isChecked && (
                    <Controller
                        name='timeLimited'
                        control={control}
                        defaultValue={timeLimited}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.formField}
                                fullWidth
                                type='number'
                                label='Thời gian giới hạn(phút)'
                                variant='outlined'
                                error={!!errors.timeLimited}
                                helperText={errors.timeLimited?.message}
                            />
                        )}
                    />
                )}
                <Controller
                    name='sharing'
                    control={control}
                    defaultValue={sharing}
                    render={({ field }) => (
                        <FormControl
                            variant='outlined'
                            className={classes.formField}
                        >
                            <Select {...field}>
                                {sharings.map((item) => {
                                    return (
                                        <MenuItem
                                            disabled={Boolean(classId)}
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.vmn}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    )}
                />
                <Button variant='contained' color='primary' type='submit'>
                    Tiếp tục
                </Button>
            </form>
        </Container>
    );
}
