import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    InputAdornment,
    makeStyles,
    TextField,
} from '@material-ui/core';
import { Code } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { verifyCode } from '../../../apis';
import {
    FAILURE,
    SERVER_ERROR,
    SUCCESS,
    VERIFYCODE_NOT_CORRECT,
} from '../../../constant';
import { verifyCodeSchema } from '../../../validateSchemas';
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

const EnterVerifyCodeForm = ({ email, onNext }) => {
    const classes = useStyles();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(verifyCodeSchema),
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
        const response = await verifyCode(email, data.verifyCode);
        if (response.data.status === SUCCESS) {
            setPending(false);
            onNext();
        }
        if (response.data.status === FAILURE) {
            setPending(false);
            setErrorResponse((prev) => {
                return { ...prev, ...response.data.data };
            });
        }
    };

    return (
        <>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='verifyCode'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <>
                            <TextField
                                {...field}
                                className={classes.textField}
                                onInput={handleInput}
                                label='Mã xác nhận'
                                variant='outlined'
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Code />
                                        </InputAdornment>
                                    ),
                                }}
                                error={
                                    !!errors.verifyCode ||
                                    !!(
                                        errorResponse?.errorMessage ===
                                        VERIFYCODE_NOT_CORRECT
                                    )
                                }
                                helperText={
                                    errors?.verifyCode
                                        ? errors?.verifyCode.message
                                        : ''
                                }
                            />
                            {errorResponse?.errorMessage ===
                                VERIFYCODE_NOT_CORRECT && (
                                <ErrorMessage errorMessage='Mã xác thực không đúng' />
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
                    Xác nhận
                </Button>
                {pending && <PendingSpinner size={30} />}
                {errorResponse?.errorMessage === SERVER_ERROR && (
                    <ErrorMessage errorMessage='Server đang gặp lỗi' />
                )}
            </form>
        </>
    );
};
EnterVerifyCodeForm.propTypes = {
    email: PropTypes.string.isRequired,
    onNext: PropTypes.func.isRequired,
};
export default EnterVerifyCodeForm;
