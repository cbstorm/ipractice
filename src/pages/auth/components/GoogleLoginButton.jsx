import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogo } from '../../../assets';
import { SERVER_ERROR } from '../../../constant';
import { loginWithGoogleAction } from '../../../redux/reducers/auth.reducer';
import { GOOGLE_CLIENT_ID } from '../../../utils';
import ErrorMessage from '../../main/commonComponents/ErrorMessage';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export default function GoogleLoginButton() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [errorResponse, setErrorResponse] = useState();

    const responseGoogle = (response) => {
        if (response.tokenId) {
            dispatch(loginWithGoogleAction(response.tokenId)).then((result) => {
                if (result.payload.status === 'success') {
                    history.push('/main');
                }
                if (result.payload.status === 'failure') {
                    setErrorResponse((prev) => {
                        return { ...prev, ...result.payload.data };
                    });
                }
            });
        }
    };

    return (
        <div className={classes.root}>
            <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                render={(renderProps) => (
                    <Button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        <img alt='logo' src={GoogleLogo} />
                    </Button>
                )}
                buttonText='Login'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy='single_host_origin'
            />
            {errorResponse && (
                <Typography color='error' component='span'>
                    {errorResponse?.errorMessage === SERVER_ERROR && (
                        <ErrorMessage errorMessage='Server đang gặp lỗi' />
                    )}
                </Typography>
            )}
        </div>
    );
}
