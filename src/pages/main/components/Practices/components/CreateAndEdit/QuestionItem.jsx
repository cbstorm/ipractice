import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Chip,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Check, Delete, Edit, ExpandMore } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createPracticeSelector,
    removeQuestionInStore,
} from '../../../../../../redux/reducers/createPractice.reducer';
import CreateQuestionForm from './CreateQuestionForm';

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
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 500,
    },
    formField: {
        width: '100%',
        margin: '16px 0',
    },
    btn: {
        marginTop: theme.spacing(2),
    },
    chip: {
        color: '#fff',
        marginLeft: theme.spacing(2),
        backgroundColor: theme.palette.success.main,
    },
    editChip: {
        marginLeft: theme.spacing(2),
    },
}));
const QuestionItem = ({ id, removeQuestion, index }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { questionList } = useSelector(createPracticeSelector);
    const [saved, setSaved] = useState(false);
    const [expanded, setExpaned] = useState(false);
    const handleChange = () => {
        setExpaned((expand) => !expand);
    };
    const handleRemoveQuestion = () => {
        dispatch(removeQuestionInStore(id));
        removeQuestion(id);
    };
    const handleEdit = (e) => {
        e.stopPropagation();
        dispatch(removeQuestionInStore(id));
    };
    useEffect(() => {
        const saved = questionList.find((question) => question.id === id);
        if (saved) {
            setSaved(true);
            setExpaned(false);
        }
        if (!saved) {
            setSaved(false);
            setExpaned(() => true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionList]);
    return (
        <div className={classes.root}>
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary
                    className={classes.questionHeading}
                    expandIcon={<ExpandMore />}
                >
                    <Typography>#{index}</Typography>
                    {saved && (
                        <>
                            <Chip
                                className={classes.chip}
                                icon={<Check />}
                                label='Đã lưu'
                            />
                            <Chip
                                className={classes.editChip}
                                icon={<Edit />}
                                label='Sửa'
                                variant='outlined'
                                color='primary'
                                onClick={handleEdit}
                            />
                        </>
                    )}
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <CreateQuestionForm saved={saved} id={id} />
                    <Button
                        className={classes.btn}
                        size='small'
                        startIcon={<Delete color='error' />}
                        onClick={handleRemoveQuestion}
                    >
                        Xóa
                    </Button>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default QuestionItem;
