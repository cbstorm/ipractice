import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import {
    Cancel,
    CheckCircleOutline,
    PersonAdd,
    SupervisedUserCircle,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    checkRelationshipStatus,
    rejectInviteFriend,
} from '../../../../../apis';
import { relationshipStatus, SUCCESS, wsEvent } from '../../../../../constant';
import { socketSelector } from '../../../../../redux/reducers/socketio.reducer';

const commonStyles = (theme) => {
    return {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.success.light,
        },
    };
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 'auto',
    },
    addBtn: {
        backgroundColor: theme.palette.primary.light,
    },
    invitedBtn: {
        ...commonStyles(theme),
    },
    acceptBtn: {
        marginRight: theme.spacing(1),
        ...commonStyles(theme),
    },
    friendBtn: {
        ...commonStyles(theme),
    },
    rejectBtn: {
        backgroundColor: theme.palette.secondary.light,
        color: '#fff',
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
}));

const Action = () => {
    const classes = useStyles();
    const { userId } = useParams();
    const { socket } = useSelector(socketSelector);
    const [pending, setPending] = useState(false);
    const [invited, setInvited] = useState(false);
    const [received, setReceived] = useState(false);
    const [friend, setFriend] = useState(false);
    const [relationshipId, setRelationshipId] = useState('');

    const handleAddFriend = () => {
        setPending(true);
        socket.emit(wsEvent.INVITE_FRIEND, userId, (response) => {
            if (response.status === SUCCESS) {
                setInvited(true);
                setPending(false);
            }
        });
    };

    const handleAcceptInviteFriend = () => {
        setPending(true);
        socket.emit(
            wsEvent.ACCEPT_INVITE_FRIEND,
            relationshipId,
            userId,
            (response) => {
                if (response.status === SUCCESS) {
                    setReceived(false);
                    setFriend(true);
                    setPending(false);
                }
            }
        );
    };

    const handleRejectInviteFriend = async () => {
        setPending(true);
        const response = await rejectInviteFriend(relationshipId);
        if (response.data.status === SUCCESS) {
            setReceived(false);
            setPending(false);
        }
    };

    const checkRelationShipStatusHandler = async () => {
        setPending(true);
        const response = await checkRelationshipStatus(userId);
        if (response.data.status === SUCCESS) {
            const relationship = response.data.data;
            if (!relationship) {
                setFriend(false);
                setInvited(false);
                setReceived(false);
                setPending(false);
                return;
            }
            if (relationship?.status === relationshipStatus.INVITING) {
                setRelationshipId(relationship._id);
                if (relationship.inviter === userId) {
                    setFriend(false);
                    setInvited(false);
                    setReceived(true);
                    setPending(false);
                    return;
                }
                if (relationship.receiver === userId) {
                    setReceived(false);
                    setFriend(false);
                    setInvited(true);
                    setPending(false);

                    return;
                }
            }
            if (relationship?.status === relationshipStatus.FRIEND) {
                setInvited(false);
                setReceived(false);
                setFriend(true);
                setPending(false);
            }
            setPending(false);
        }
    };

    useEffect(() => {
        checkRelationShipStatusHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <div className={classes.root}>
            {!invited && !received && !friend && (
                <Button
                    className={classes.addBtn}
                    variant='contained'
                    color='primary'
                    onClick={handleAddFriend}
                >
                    {pending && <CircularProgress />}
                    {!pending && (
                        <>
                            <PersonAdd />
                            Thêm bạn bè
                        </>
                    )}
                </Button>
            )}
            {invited && (
                <Button className={classes.invitedBtn} variant='contained'>
                    {pending && <CircularProgress />}
                    {!pending && (
                        <>
                            <CheckCircleOutline />
                            Đã gửi lời mời
                        </>
                    )}
                </Button>
            )}
            {received && (
                <>
                    <Button
                        className={classes.acceptBtn}
                        variant='contained'
                        onClick={handleAcceptInviteFriend}
                    >
                        {pending && <CircularProgress />}
                        {!pending && (
                            <>
                                <CheckCircleOutline />
                                Đồng ý
                            </>
                        )}
                    </Button>
                    <Button
                        className={classes.rejectBtn}
                        variant='contained'
                        onClick={handleRejectInviteFriend}
                    >
                        {!pending && (
                            <>
                                <Cancel />
                                Từ chối
                            </>
                        )}
                    </Button>
                </>
            )}
            {friend && (
                <Button className={classes.friendBtn} variant='contained'>
                    {pending && <CircularProgress />}
                    {!pending && (
                        <>
                            <SupervisedUserCircle />
                            Bạn bè
                        </>
                    )}
                </Button>
            )}
        </div>
    );
};

export default Action;
