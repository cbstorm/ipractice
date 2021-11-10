import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import GoogleLoginButton from './components/GoogleLoginButton';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
    },
    inner: {
        backgroundColor: theme.palette.grey[200],
        minWidth: 500,
        minHeight: 600,
        borderRadius: 15,
        [theme.breakpoints.down('xs')]: {
            minHeight: '100vh',
            borderRadius: 0,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(8),
    },
    text: {
        textAlign: 'center',
    },
    social: {
        display: 'flex',
        marginTop: theme.spacing(2),
    },
}));
export default function AuthPage() {
    const classes = useStyles();
    const history = useHistory();
    const [isRegister, setRegister] = useState(false);
    const [isForgotPassword, setForgotPassword] = useState(false);

    const handleBackLogin = () => {
        setRegister(false);
        setForgotPassword(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            history.push('/main');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={classes.root}>
            <div className={classes.inner}>
                {!isRegister && !isForgotPassword && (
                    <Typography variant='h3' component='h5' color='primary'>
                        Đăng nhập
                    </Typography>
                )}
                {isRegister && (
                    <Typography variant='h3' component='h5' color='primary'>
                        Đăng ký
                    </Typography>
                )}
                {isForgotPassword && (
                    <Typography variant='h3' component='h5' color='primary'>
                        Quên mật khẩu
                    </Typography>
                )}
                {isRegister && <RegisterForm />}
                {isForgotPassword && (
                    <ForgotPassword onBackLogin={handleBackLogin} />
                )}
                {!isRegister && !isForgotPassword && <LoginForm />}
                {!isRegister && !isForgotPassword && (
                    <Typography className={classes.text} component='span'>
                        Chưa có tài khoản?
                        <Button
                            onClick={() => setRegister(true)}
                            color='primary'
                        >
                            Đăng ký
                        </Button>
                    </Typography>
                )}
                {!isRegister && !isForgotPassword && (
                    <Button
                        onClick={() => setForgotPassword(true)}
                        color='primary'
                    >
                        Quên mật khẩu?
                    </Button>
                )}
                {(isRegister || isForgotPassword) && (
                    <Typography className={classes.text} component='span'>
                        {!isForgotPassword && 'Đã có tài khoản?'}
                        <Button onClick={handleBackLogin} color='primary'>
                            Quay lại đăng nhập
                        </Button>
                    </Typography>
                )}
                {!isRegister && !isForgotPassword && (
                    <div className={classes.social}>
                        <GoogleLoginButton />
                    </div>
                )}
            </div>
        </div>
    );
}
