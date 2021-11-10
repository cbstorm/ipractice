import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import { FAILURE } from '../../constant';
import {
    authSelector,
    refreshTokenAction,
} from '../../redux/reducers/auth.reducer';
import {
    socketConnection,
    socketSelector,
} from '../../redux/reducers/socketio.reducer';
import {
    decodeRefreshToken,
    decodeToken,
    SOCKET_SERVER_URL,
} from '../../utils';
import Header from './components/Header/Header';
import MainContent from './components/MainContent';
import BottomNav from './components/NavBar/BottomNav';
import NavbarLeft from './components/NavBar/NavbarLeft';
import RightPart from './components/RightPart';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        position: 'relative',
    },
}));

export default function MainRoute() {
    const classes = useStyles();
    const history = useHistory();
    const { socket } = useSelector(socketSelector);
    const dispatch = useDispatch();

    const { isRefreshingToken } = useSelector(authSelector);

    useEffect(() => {
        const token = localStorage.getItem('token');
        decodeToken(token, () => {
            localStorage.clear();
            history.push('/auth');
        });
        const userProfile = JSON.parse(
            localStorage.getItem('userProfile') || 'null'
        );
        if (!token || !userProfile) {
            localStorage.clear();
            history.push('/auth');
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            localStorage.clear();
            history.push('/auth');
            return;
        }
        decodeRefreshToken(refreshToken, () => {
            localStorage.clear();
            history.push('/auth');
        });
        dispatch(refreshTokenAction(refreshToken)).then((result) => {
            if (result.payload.status === FAILURE) {
                localStorage.clear();
                history.push('/auth');
                return;
            }
        });
        const refreshTokenInterval = setInterval(() => {
            dispatch(refreshTokenAction(refreshToken)).then((result) => {
                if (result.payload.status === FAILURE) {
                    localStorage.clear();
                    history.push('/auth');
                    return;
                }
            });
        }, 540000);
        return () => clearInterval(refreshTokenInterval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let socket;
        let timer;
        if (!isRefreshingToken) {
            const token = localStorage.getItem('token');
            socket = io(`${SOCKET_SERVER_URL}`, {
                auth: {
                    token,
                },
            });
            dispatch(socketConnection(socket));
        } else {
            timer = setTimeout(() => {
                const token = localStorage.getItem('token');
                socket = io(`${SOCKET_SERVER_URL}`, {
                    auth: {
                        token,
                    },
                });
                dispatch(socketConnection(socket));
            }, 5000);
        }
        return () => {
            clearTimeout(timer);
            if (socket) {
                socket.disconnect();
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('error', (errorMessage) => {
                console.log(errorMessage);
            });
        }
    }, [socket]);

    return (
        <div className={classes.root}>
            <NavbarLeft />
            <RightPart>
                <Header />
                <MainContent />
                <BottomNav />
            </RightPart>
        </div>
    );
}
