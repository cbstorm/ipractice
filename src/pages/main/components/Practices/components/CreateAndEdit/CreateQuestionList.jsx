import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircleOutline } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { createPracticeSelector } from '../../../../../../redux/reducers/createPractice.reducer';
import QuestionItem from './QuestionItem';

const useStyles = makeStyles((theme) => ({
    action: {
        marginTop: theme.spacing(3),
        display: 'flex',
        justifyContent: 'center',
    },
    btnContainer: {
        margin: `${theme.spacing(4)}px 0`,
        display: 'flex',
        justifyContent: 'center',
    },
    addMoreBtn: {
        width: '40%',
        backgroundColor: theme.palette.success.main,
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    actionBtn: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
}));

export default function CreateQuestionList({ handleBack, handleNext }) {
    const classes = useStyles();
    const [temporaryQuestionList, setQuestionList] = useState([]);
    const { questionList } = useSelector(createPracticeSelector);
    const addMoreQuestionHandler = () => {
        setQuestionList((prev) => {
            return [
                ...prev,
                {
                    id: uuidv4(),
                },
            ];
        });
    };
    const removeQuestion = (id) => {
        setQuestionList((questionList) => {
            return questionList.filter((question) => question.id !== id);
        });
    };

    return (
        <Container>
            {temporaryQuestionList.length > 0 &&
                temporaryQuestionList.map((questionItem, index) => {
                    return (
                        <QuestionItem
                            key={questionItem.id}
                            id={questionItem.id}
                            index={index}
                            removeQuestion={removeQuestion}
                        />
                    );
                })}
            <div className={classes.btnContainer}>
                <Button
                    className={classes.addMoreBtn}
                    endIcon={<AddCircleOutline />}
                    variant='contained'
                    onClick={addMoreQuestionHandler}
                >
                    Thêm câu hỏi
                </Button>
            </div>
            <div className={classes.action}>
                <Button
                    className={classes.actionBtn}
                    variant='contained'
                    color='primary'
                    onClick={() => handleBack()}
                >
                    Quay lại
                </Button>
                <Button
                    className={classes.actionBtn}
                    variant='contained'
                    color='primary'
                    disabled={questionList.length === 0}
                    onClick={() => handleNext()}
                >
                    Hoàn thành
                </Button>
            </div>
        </Container>
    );
}
