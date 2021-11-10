import { yupResolver } from '@hookform/resolvers/yup';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AlternateEmail, LockOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    EMAIL_NOT_EXISTED,
    LOGIN_BY_GOOGLE,
    PWD_NOT_CORRECT,
    SERVER_ERROR,
} from '../../../constant';
import { loginAction } from '../../../redux/reducers/auth.reducer';
import { loginSchema } from '../../../validateSchemas';
import ErrorMessage from '../../main/commonComponents/ErrorMessage';

const useStyle = makeStyles((theme) => ({
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
    errorMessage: {
        marginTop: theme.spacing(1),
        color: theme.palette.error.main,
    },
}));

export default function LoginForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const classes = useStyle();

    const dispatch = useDispatch();
    const history = useHistory();
    const [errorResponse, setErrorResponse] = useState();
    const handleInput = () => {
        setErrorResponse(() => {
            return {
                ...errorResponse,
                errorMessage: '',
            };
        });
    };

    const onSubmit = (data) => {
        dispatch(loginAction(data)).then((result) => {
            if (result.payload.status === 'failure') {
                setErrorResponse(() => {
                    return { ...errorResponse, ...result.payload.data };
                });
                return;
            }
            if (result.payload.status === 'success') {
                history.push('/main');
                return;
            }
        });
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
                                    ) ||
                                    !!(
                                        errorResponse?.errorMessage ===
                                        LOGIN_BY_GOOGLE
                                    )
                                }
                                helperText={
                                    errors.email ? errors.email.message : ''
                                }
                            />
                            {errorResponse?.errorMessage ===
                                EMAIL_NOT_EXISTED && (
                                <ErrorMessage errorMessage='Email Không tồn tại' />
                            )}
                            {errorResponse?.errorMessage ===
                                LOGIN_BY_GOOGLE && (
                                <ErrorMessage errorMessage='Email này được đăng nhập bằng Google' />
                            )}
                        </>
                    )}
                />

                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <>
                            <TextField
                                {...field}
                                type='password'
                                className={classes.textField}
                                onInput={handleInput}
                                label='Mật khẩu'
                                variant='outlined'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LockOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                                error={
                                    !!errors.password ||
                                    !!(
                                        errorResponse?.errorMessage ===
                                        PWD_NOT_CORRECT
                                    )
                                }
                                helperText={
                                    errors.password
                                        ? errors.password?.message
                                        : ''
                                }
                            />
                            {errorResponse?.errorMessage ===
                                PWD_NOT_CORRECT && (
                                <ErrorMessage errorMessage='Mật khẩu không đúng' />
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
                    Đăng nhập
                </Button>
                {errorResponse?.errorMessage === SERVER_ERROR && (
                    <ErrorMessage errorMessage='Server đang gặp lỗi' />
                )}
            </form>
        </>
    );
}