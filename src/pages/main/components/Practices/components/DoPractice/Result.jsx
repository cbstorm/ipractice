import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { gradientSuccessBackground } from '../../../../../../theme';

const useStyles = makeStyles((theme) => ({
    correct: {
        display: 'flex',
        margin: theme.spacing(3),
        width: '60%',
        borderRadius: 20,
        color: '#fff',
        ...gradientSuccessBackground,
        padding: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(2),
            width: '100%',
        },
    },
    inCorrect: {
        display: 'flex',
        margin: theme.spacing(3),
        width: '60%',
        borderRadius: 20,
        color: '#fff',
        backgroundColor: theme.palette.error.light,
        padding: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(2),
            width: '100%',
        },
    },
    btn: {
        marginLeft: 'auto',
    },
    textContainer: {
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(2),
        },
    },
}));

const Result = ({ isCorrect, correctAnswer, handleNext }) => {
    const classes = useStyles();
    return (
        <div className={isCorrect ? classes.correct : classes.inCorrect}>
            <div className={classes.textContainer}>
                <Typography variant='h6'>
                    {isCorrect ? 'Chính xác' : 'Không chính xác'}
                </Typography>
                {!isCorrect && (
                    <Typography variant='h6'>
                        Đáp án : {correctAnswer}
                    </Typography>
                )}
            </div>
            <Button
                className={classes.btn}
                variant='contained'
                color='primary'
                onClick={handleNext}
            >
                Tiếp tục
            </Button>
        </div>
    );
};

export default Result;
