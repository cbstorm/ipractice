import {
    Button,
    CircularProgress,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { Cancel, CheckCircleOutline, PeopleAlt } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroyRequestJoinClass, rejectJoinClass } from '../../../../../apis';
import { SUCCESS, wsEvent } from '../../../../../constant';
import {
    classDetailsSelector,
    handleAcceptAction,
    setInvitedAction,
    setJoinedAction,
    setRequestedAction,
} from '../../../../../redux/reducers/classDetails.reducer';
import { socketSelector } from '../../../../../redux/reducers/socketio.reducer';
import { gradientBackground } from '../../../../../theme';
import { getSubject } from '../../../../../utils';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        ...gradientBackground,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: theme.spacing(3),
        padding: theme.spacing(4),
    },
    info: {
        maxWidth: '60%',
        maxHeight: 340,
        overflow: 'hidden',
    },
    subTitle: {
        color: theme.palette.grey[200],
    },
    title: {
        fontWeight: 700,
        color: theme.palette.grey[100],
        fontSize: 22,
    },
    joinBtn: {
        backgroundColor: theme.palette.primary.light,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    acceptBtn: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: theme.palette.success.light,
        },
    },
    rejectBtn: {
        backgroundColor: theme.palette.error.main,
        color: '#fff',
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    joinedBtn: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: theme.palette.success.light,
        },
    },
}));

const ClassInfo = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const classInfo = useSelector(classDetailsSelector);
    const { _id } = JSON.parse(localStorage.getItem('userProfile'));
    const { socket } = useSelector(socketSelector);
    const [pending, setPending] = useState(false);
    const [showDestroyBtn, setShowDestroyBtn] = useState(false);

    const handleAcceptJoinClass = () => {
        setPending(true);
        if (socket) {
            socket.emit(
                wsEvent.ACCEPT_JOIN_CLASS,
                { classId: classInfo._id, adminId: classInfo.adminUser },
                (response) => {
                    if (response.status === SUCCESS) {
                        dispatch(setInvitedAction(false));
                        dispatch(setJoinedAction(true));
                        dispatch(handleAcceptAction({ userId: _id }));
                        setPending(false);
                    }
                }
            );
        }
    };

    const handleRequestJoinClass = () => {
        setPending(true);
        if (socket) {
            socket.emit(
                wsEvent.REQUEST_JOIN_CLASS,
                { classId: classInfo._id, adminId: classInfo.adminUser },
                (response) => {
                    if (response.status === SUCCESS) {
                        dispatch(setRequestedAction(true));
                        setPending(false);
                    }
                }
            );
        }
    };

    const handleShowDestroyBtn = () => {
        setShowDestroyBtn(true);
    };
    const handleNotShowDestroyBtn = () => {
        setShowDestroyBtn(false);
    };

    const handleDestroyRequestJoinClass = async () => {
        setPending(true);
        const response = await destroyRequestJoinClass(classInfo._id);
        if (response.data.status === SUCCESS) {
            dispatch(setRequestedAction(false));
            setPending(false);
        }
    };

    const handleRejectJoinClass = async () => {
        setPending(true);
        const response = await rejectJoinClass(classInfo._id);
        if (response.data.status === SUCCESS) {
            dispatch(setInvitedAction(false));
            setPending(false);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.info}>
                <Typography className={classes.subTitle} component='h3'>
                    {getSubject(classInfo?.subject)}
                </Typography>
                <Typography className={classes.title}>
                    {classInfo?.name}
                </Typography>
            </div>
            {!classInfo?.isAdmin && (
                <div className={classes.action}>
                    {!classInfo?.isInvited &&
                        !classInfo?.isJoined &&
                        !classInfo?.isRequested && (
                            <Button
                                variant='contained'
                                color='primary'
                                className={classes.joinBtn}
                                onClick={handleRequestJoinClass}
                            >
                                {pending && <CircularProgress size={20} />}
                                <PeopleAlt />
                                Tham gia lớp học
                            </Button>
                        )}
                    {classInfo?.isRequested && !showDestroyBtn && (
                        <Button
                            variant='contained'
                            onMouseOver={handleShowDestroyBtn}
                            className={classes.joinBtn}
                        >
                            <CheckCircleOutline />
                            Đã gửi yêu cầu
                        </Button>
                    )}
                    {classInfo?.isRequested && showDestroyBtn && (
                        <Button
                            variant='contained'
                            onMouseLeave={handleNotShowDestroyBtn}
                            onClick={handleDestroyRequestJoinClass}
                            className={classes.rejectBtn}
                        >
                            <Cancel />
                            Hủy yêu cầu
                        </Button>
                    )}
                    {classInfo?.isInvited && (
                        <>
                            <Button
                                variant='contained'
                                className={classes.acceptBtn}
                                onClick={handleAcceptJoinClass}
                            >
                                {pending && <CircularProgress size={20} />}
                                <CheckCircleOutline />
                                Đồng ý
                            </Button>
                            <Button
                                variant='contained'
                                className={classes.rejectBtn}
                                onClick={handleRejectJoinClass}
                            >
                                {pending && <CircularProgress size={20} />}
                                <Cancel />
                                Từ chối
                            </Button>
                        </>
                    )}
                    {classInfo?.isJoined && (
                        <Button
                            variant='contained'
                            className={classes.joinedBtn}
                        >
                            <CheckCircleOutline />
                            Đã tham gia
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ClassInfo;
