import { yupResolver } from '@hookform/resolvers/yup';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    AlternateEmail,
    Lock,
    LockOutlined,
    PermIdentityOutlined,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { EMAIL_EXISTED, SERVER_ERROR } from '../../../constant';
import { registerAction } from '../../../redux/reducers/auth.reducer';
import { registerSchema } from '../../../validateSchemas';
import ErrorMessage from '../../main/commonComponents/ErrorMessage';

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(6),
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

export default function RegisterForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
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
        dispatch(registerAction(data)).then((result) => {
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
                    name='name'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.textField}
                            label='Tên'
                            variant='outlined'
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <PermIdentityOutlined />
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                        />
                    )}
                />
                <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <>
                            <TextField
                                {...field}
                                className={classes.textField}
                                label='Email'
                                onInput={handleInput}
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
                                        EMAIL_EXISTED
                                    )
                                }
                                helperText={
                                    errors.email ? errors.email.message : ''
                                }
                            />
                            {errorResponse?.errorMessage === EMAIL_EXISTED && (
                                <ErrorMessage errorMessage='Email đã tồn tại' />
                            )}
                        </>
                    )}
                />

                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type='password'
                            className={classes.textField}
                            label='Mật khẩu'
                            variant='outlined'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LockOutlined />
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.password}
                            helperText={
                                errors.password ? errors.password?.message : ''
                            }
                        />
                    )}
                />
                <Controller
                    name='confirmPassword'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type='password'
                            className={classes.textField}
                            label='Xác nhận mật khẩu'
                            variant='outlined'
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.confirmPassword}
                            helperText={
                                errors.confirmPassword
                                    ? errors.confirmPassword?.message
                                    : ''
                            }
                        />
                    )}
                />

                <Button
                    className={classes.btnSubmit}
                    type='submit'
                    variant='contained'
                    color='primary'
                >
                    Đăng ký
                </Button>
                {errorResponse?.errorMessage === SERVER_ERROR && (
                    <ErrorMessage errorMessage='Server đang gặp lỗi' />
                )}
            </form>
        </>
    );
}
