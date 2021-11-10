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
import { resetPassword } from '../../../apis';
import { FAILURE, SERVER_ERROR, SUCCESS } from '../../../constant';
import { resetPasswordSchema } from '../../../validateSchemas';
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

const ResetPasswordForm = ({ email, onBackLogin }) => {
    const classes = useStyles();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
    });
    const [errorResponse, setErrorResponse] = useState();
    const [pending, setPending] = useState(false);

    const onSubmit = async (data) => {
        setPending(true);
        const response = await resetPassword(email, data.password);
        if (response.data.status === SUCCESS) {
            setPending(false);
            onBackLogin();
        }
        if (response.data.status === FAILURE) {
            setErrorResponse((prev) => ({ ...prev, ...response.data.data }));
        }
    };

    return (
        <>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type='password'
                            className={classes.textField}
                            fullWidth
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
                    Đặt lại mật khẩu
                </Button>
                {pending && <PendingSpinner size={30} />}
                {errorResponse?.errorMessage === SERVER_ERROR && (
                    <ErrorMessage errorMessage='Server đang gặp lỗi' />
                )}
            </form>
        </>
    );
};
ResetPasswordForm.propTypes = {
    email: PropTypes.string.isRequired,
    onBackLogin: PropTypes.func.isRequired,
};
export default ResetPasswordForm;
