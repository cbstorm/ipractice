import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogo } from '../../../assets';
import { FAILURE, SERVER_ERROR, SUCCESS } from '../../../constant';
import { loginWithGoogleAction } from '../../../redux/reducers/auth.reducer';
import ErrorMessage from '../../main/commonComponents/ErrorMessage';
import PendingSpinner from '../../main/commonComponents/PendingSpinner';

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
    const [pending, setPending] = useState(false);
    const [errorResponse, setErrorResponse] = useState();

    const responseGoogle = (response) => {
        setPending(true);
        if (response.tokenId) {
            dispatch(loginWithGoogleAction(response.tokenId)).then((result) => {
                if (result.payload.status === SUCCESS) {
                    history.push('/main');
                }
                if (result.payload.status === FAILURE) {
                    setErrorResponse((prev) => {
                        return { ...prev, ...result.payload.data };
                    });
                }
                setPending(false);
            });
        }
        setPending(false);
    };

    return (
        <div className={classes.root}>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
            {pending && <PendingSpinner size={30} />}
            {errorResponse && errorResponse?.errorMessage === SERVER_ERROR && (
                <ErrorMessage errorMessage='Server đang gặp lỗi' />
            )}
        </div>
    );
}
