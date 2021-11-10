import { Button, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    form: {
        margin: theme.spacing(1),
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formField: {
        margin: theme.spacing(3),
        width: '60%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
}));

const AnswerForm = ({ handleSubmit, control, errors, isSubmited }) => {
    const classes = useStyles();
    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Controller
                    name='answer'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.formField}
                            placeholder='Nhập vào câu trả lời'
                            variant='outlined'
                            rows={4}
                            multiline
                            error={!!errors.answer}
                            helperText={
                                errors?.answer && errors?.answer?.message
                            }
                        />
                    )}
                />
                {!isSubmited && (
                    <Button variant='contained' color='primary' type='submit'>
                        Kiểm tra
                    </Button>
                )}
            </form>
        </>
    );
};

export default AnswerForm;
