import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    InputAdornment,
    makeStyles,
    TextField,
} from '@material-ui/core';
import { AlternateEmail } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { forgotPassword } from '../../../apis';
import { EMAIL_NOT_EXISTED, SERVER_ERROR, SUCCESS } from '../../../constant';
import { forgotPasswordSchema } from '../../../validateSchemas';
import ErrorMessage from '../../main/commonComponents/ErrorMessage';
import PendingSpinner from '../../main/commonComponents/PendingSpinner';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        marginTop: theme.spacing(4),
    },
    btnSubmit: {
        marginTop: theme.spacing(4),
    },
}));

const EnterEmailForm = ({ onSetEmail, onNext }) => {
    const classes = useStyles();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
    });
    const [pending, setPending] = useState(false);
    const [errorResponse, setErrorResponse] = useState();
    const handleInput = () => {
        setErrorResponse(() => {
            return {
                ...errorResponse,
                errorMessage: '',
            };
        });
    };

    const onSubmit = async (data) => {
        setPending(true);
        const response = await forgotPassword(data.email);
        if (response.data.status === SUCCESS) {
            onSetEmail(data.email);
            setPending(false);
            onNext();
        }
    };

    return (
        <>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <>
                            <TextField
                                {...field}
                                className={classes.textField}
                                onInput={handleInput}
                                label='Email'
                                variant='outlined'
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AlternateEmail />
                                        </InputAdornment>
                                    ),
                                }}
                                error={
                                    !!errors.email ||
                                    !!(
                                        errorResponse?.errorMessage ===
                                        EMAIL_NOT_EXISTED
                                    )
                                }
                                helperText={
                                    errors.email ? errors.email.message : ''
                                }
                            />
                            {errorResponse?.errorMessage ===
                                EMAIL_NOT_EXISTED && (
                                <ErrorMessage errorMessage='Email không tồn tại' />
                            )}
                        </>
                    )}
                />

                <Button
                    className={classes.btnSubmit}
                    type='submit'
                    variant='contained'
                    color='primary'
                >
                    Gửi mã xác nhận
                </Button>
                {pending && <PendingSpinner size={30} />}
                {errorResponse?.errorMessage === SERVER_ERROR && (
                    <ErrorMessage errorMessage='Server đang gặp lỗi' />
                )}
            </form>
        </>
    );
};

EnterEmailForm.propTypes = {
    onSetEmail: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
};

export default EnterEmailForm;
