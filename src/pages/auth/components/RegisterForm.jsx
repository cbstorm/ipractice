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
import {
    EMAIL_EXISTED,
    FAILURE,
    SERVER_ERROR,
    SUCCESS,
} from '../../../constant';
import { registerAction } from '../../../redux/reducers/auth.reducer';
import { registerSchema } from '../../../validateSchemas';
import ErrorMessage from '../../main/commonComponents/ErrorMessage';
import PendingSpinner from '../../main/commonComponents/PendingSpinner';

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

    const onSubmit = (data) => {
        setPending(true);
        dispatch(registerAction(data)).then((result) => {
            if (result.payload.status === FAILURE) {
                setErrorResponse(() => {
                    return { ...errorResponse, ...result.payload.data };
                });
                return;
            }
            if (result.payload.status === SUCCESS) {
                history.push('/main');
                return;
            }
            setPending(false);
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
                            label='T??n'
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
                                <ErrorMessage errorMessage='Email ???? t???n t???i' />
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
                            label='M???t kh???u'
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
                            label='X??c nh???n m???t kh???u'
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
                    ????ng k??
                </Button>
                {pending && <PendingSpinner size={30} />}
                {errorResponse?.errorMessage === SERVER_ERROR && (
                    <ErrorMessage errorMessage='Server ??ang g???p l???i' />
                )}
            </form>
        </>
    );
}
