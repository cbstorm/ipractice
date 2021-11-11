import { yupResolver } from '@hookform/resolvers/yup';
import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    CONSTRUCTED_RESPONSE,
    SELECTED_RESPONSE,
} from '../../../../../../constant';
import { gradientMainLightBackground } from '../../../../../../theme';
import {
    compareConstructedAnswer,
    compareSelectedAnswer,
} from '../../../../../../utils';
import { answerFormSchema } from '../../../../../../validateSchemas/pratice.schema';
import AnswerForm from './AnswerForm';
import OptionContainer from './OptionContainer';
import Result from './Result';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    demand: {
        width: '100%',
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        borderRadius: 20,
        color: '#fff',
        ...gradientMainLightBackground,
    },
    question: {
        width: '60%',
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        backgroundColor: '#fff',
        boxShadow: '0px 2px 8px #999',
        borderRadius: 20,
        color: '#333',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
}));

const DoPracticeMain = ({
    demand,
    question,
    options,
    type,
    correctAnswers,
    handleNextQuestion,
    handleCount,
}) => {
    const classes = useStyles();
    const [choice, setChoice] = useState('');
    const [isSubmited, setSubmit] = useState(false);
    const [isCorrect, setCorrect] = useState(false);
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(answerFormSchema),
    });
    const handleChoice = (value) => {
        setChoice(() => value);
    };

    const handleSubmitAnswer = (data) => {
        let isCorrect;
        if (type === SELECTED_RESPONSE) {
            isCorrect = compareSelectedAnswer(choice, correctAnswers);
        } else {
            isCorrect = compareConstructedAnswer(data.answer, correctAnswers);
        }
        if (isCorrect) {
            setCorrect(true);
            setSubmit(true);
        } else {
            setSubmit(true);
            setCorrect(false);
        }
        handleCount(isCorrect);
    };

    const handleNext = () => {
        setValue('answer', '');
        setChoice('');
        setCorrect(false);
        setSubmit(false);
        handleNextQuestion();
    };

    return (
        <Container className={classes.root}>
            <Typography variant='h5' component='h6' className={classes.demand}>
                {demand}
            </Typography>
            <Typography
                variant='h6'
                component='h6'
                className={classes.question}
            >
                {question}
            </Typography>
            {type === SELECTED_RESPONSE && (
                <OptionContainer
                    handleChoice={handleChoice}
                    options={options}
                    handleSubmitAnswer={handleSubmitAnswer}
                    choice={choice}
                    isSubmited={isSubmited}
                />
            )}
            {type === CONSTRUCTED_RESPONSE && (
                <AnswerForm
                    handleSubmit={handleSubmit(handleSubmitAnswer)}
                    control={control}
                    errors={errors}
                    isSubmited={isSubmited}
                />
            )}
            {isSubmited && (
                <Result
                    isCorrect={isCorrect}
                    correctAnswer={correctAnswers[0]}
                    handleNext={handleNext}
                />
            )}
        </Container>
    );
};

export default DoPracticeMain;
