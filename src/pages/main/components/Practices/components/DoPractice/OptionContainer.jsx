import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    optionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: theme.spacing(3),
    },
    optionItem: {
        width: '50%',
        borderRadius: 10,
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: '#fff',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    active: {
        width: '50%',
        borderRadius: 10,
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: '#fff',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
}));

const OptionContainer = ({
    handleChoice,
    options,
    choice,
    handleSubmitAnswer,
    isSubmited,
}) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.optionContainer}>
                {options.length > 0 &&
                    options.map((option) => {
                        return (
                            <Button
                                key={option.id}
                                className={
                                    choice === option.value
                                        ? classes.active
                                        : classes.optionItem
                                }
                                onClick={() => handleChoice(option.value)}
                                variant='outlined'
                                color='primary'
                            >
                                {option.value}
                            </Button>
                        );
                    })}
            </div>
            {!isSubmited && (
                <Button
                    disabled={choice ? false : true}
                    variant='contained'
                    color='primary'
                    onClick={handleSubmitAnswer}
                >
                    Kiểm tra
                </Button>
            )}
        </>
    );
};

export default OptionContainer;
