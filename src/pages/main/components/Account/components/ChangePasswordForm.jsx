import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    InputAdornment,
    makeStyles,
    TextField,
} from '@material-ui/core';
import { Lock, LockOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { editPassword } from '../../../../../apis';
import {
    FAILURE,
    PWD_NOT_CORRECT,
    SERVER_ERROR,
    SUCCESS,
} from '../../../../../constant';
import { editPasswordSchema } from '../../../../../validateSchemas';
import ErrorMessage from '../../../commonComponents/ErrorMessage';
import PendingSpinner from '../../../commonComponents/PendingSpinner';

const useStyles = makeStyles((theme) => ({
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

const ChangePasswordForm = ({ onBack }) => {
    const classes = useStyles();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editPasswordSchema),
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
        const response = await editPassword(data);
        if (response.data.status === SUCCESS) {
            onBack();
        }
        if (response.data.status === FAILURE) {
            setErrorResponse((prev) => ({ ...prev, ...response.data.data }));
        }
        setPending(false);
    };

    return (
        <>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='oldPassword'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type='password'
                            className={classes.textField}
                            label='Mật khẩu cũ'
                            onInput={handleInput}
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
                {errorResponse?.errorMessage === PWD_NOT_CORRECT && (
                    <ErrorMessage errorMessage='Mật khẩu cũ không đúng' />
                )}
                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type='password'
                            className={classes.textField}
                            label='Mật khẩu mới'
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
                    Cập nhật
                </Button>
                {pending && <PendingSpinner size={30} />}
                {errorResponse?.errorMessage === SERVER_ERROR && (
                    <ErrorMessage errorMessage='Server đang gặp lỗi' />
                )}
            </form>
        </>
    );
};

ChangePasswordForm.propTypes = {
    onBack: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
