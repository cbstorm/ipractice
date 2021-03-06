import {
    CircularProgress,
    Container,
    makeStyles,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPractice } from '../../../../apis';
import { FAILURE } from '../../../../constant';
import { shuffleQuestionList } from '../../../../utils/shuffleQuestion';
import DoPracticeMain from './components/DoPractice/DoPracticeMain';
import Finish from './components/DoPractice/Finish';
import Timer from './components/DoPractice/Timer';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing(4),
    },
}));

const DoPractice = () => {
    const classes = useStyles();
    const { practiceId } = useParams();
    const [isPending, setPending] = useState(false);
    const [errorResponse, setErrorResponse] = useState();
    const [practiceData, setPracticeData] = useState({
        limitTime: false,
        timeLimited: 0,
        questionList: [],
        _id: '',
    });
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerCorrectCount, setAnswerCorrectCount] = useState(0);
    const [finished, setFinish] = useState(false);
    const [expired, setExpire] = useState(false);

    const getPracticeHandler = async () => {
        setPending(true);
        const response = await getPractice(practiceId);
        if (response.data.status === FAILURE) {
            setErrorResponse((prev) => {
                return { ...prev, ...response.data.data };
            });
            return;
        }
        setPracticeData((prev) => {
            const questionList = response.data.data.questionList;
            shuffleQuestionList(questionList);
            return { ...prev, ...response.data.data };
        });
        setPending(false);
    };

    const handleCount = (isCorrect) => {
        if (isCorrect) {
            setAnswerCorrectCount((count) => count + 1);
            return;
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuestion((cur) => cur + 1);
    };

    useEffect(() => {
        getPracticeHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFinish = (isExpired) => {
        if (
            currentQuestion !== 0 &&
            !practiceData.questionList[currentQuestion]
        ) {
            setFinish(true);
            return;
        }
        if (isExpired) {
            setFinish(true);
            setExpire(true);
            return;
        }
        setFinish(false);
    };
    useEffect(() => {
        handleFinish();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [practiceData, currentQuestion]);
    return (
        <Container className={classes.root}>
            {isPending && <CircularProgress />}
            {!finished && practiceData.limitTime && (
                <Timer
                    timeLimited={practiceData.timeLimited}
                    handleFinish={handleFinish}
                />
            )}
            {!finished && (
                <DoPracticeMain
                    {...practiceData.questionList[currentQuestion]}
                    handleNextQuestion={handleNextQuestion}
                    handleCount={handleCount}
                />
            )}
            {finished && (
                <Finish
                    questionCount={practiceData.questionList.length}
                    practiceId={practiceData._id}
                    answerCorrectCount={answerCorrectCount}
                    expired={expired}
                />
            )}
            {errorResponse?.errorMessage && (
                <Typography color='error'>C?? l???i x???y ra</Typography>
            )}
        </Container>
    );
};

export default DoPractice;
