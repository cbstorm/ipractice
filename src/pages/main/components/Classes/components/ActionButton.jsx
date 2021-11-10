import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteMember, unInviteMember } from '../../../../../apis';
import { SUCCESS, wsEvent } from '../../../../../constant';
import {
    handleDeleteMemberAction,
    handleInviteAction,
    handleUnInviteAction,
} from '../../../../../redux/reducers/classDetails.reducer';
import { socketSelector } from '../../../../../redux/reducers/socketio.reducer';

const useStyles = makeStyles((theme) => ({
    inviteBtn: {},
    invitedBtn: {
        color: '#fff',
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.light,
        },
    },
    deleteMemberBtn: {
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
}));

const ActionButton = ({ isJoined, isInvited, userId, joinedId }) => {
    const classes = useStyles();
    const { classId } = useParams();
    const dispatch = useDispatch();
    const [pending, setPending] = useState(false);
    const { socket } = useSelector(socketSelector);
    const [showDeleteMemberBtn, setShowDeleteMemberBtn] = useState(false);

    const handleInviteJoinClass = () => {
        setPending(true);
        if (socket) {
            socket.emit(
                wsEvent.INVITE_JOIN_CLASS,
                { classId, userId },
                (response) => {
                    if (response.status === SUCCESS) {
                        dispatch(handleInviteAction(userId));
                        setPending(false);
                    }
                }
            );
        }
    };

    const handleUnInviteJoinClass = async () => {
        setPending(true);
        const response = await unInviteMember(classId, userId);
        if (response.data.status === SUCCESS) {
            dispatch(handleUnInviteAction(userId));
            setPending(false);
        }
    };

    const handleShowDeleteMemberBtn = () => {
        setShowDeleteMemberBtn(true);
    };
    const handleNotShowDeleteMemberBtn = () => {
        setShowDeleteMemberBtn(false);
    };
    const handleDeleteMember = async () => {
        setPending(true);
        if (joinedId) {
            const response = await deleteMember(classId, joinedId);
            if (response.data.status === SUCCESS) {
                dispatch(handleDeleteMemberAction(joinedId));
                setPending(false);
            }
        }
    };

    return (
        <>
            {!isInvited && !isJoined && (
                <Button
                    onClick={handleInviteJoinClass}
                    variant='outlined'
                    color='primary'
                >
                    {pending && <CircularProgress size={20} />}
                    Mời vào lớp
                </Button>
            )}
            {isJoined && (
                <>
                    {!showDeleteMemberBtn && (
                        <Button
                            onMouseOver={handleShowDeleteMemberBtn}
                            variant='outlined'
                            color='primary'
                        >
                            {pending && <CircularProgress size={20} />}
                            Đã vào lớp
                        </Button>
                    )}
                    {showDeleteMemberBtn && (
                        <Button
                            onMouseLeave={handleNotShowDeleteMemberBtn}
                            onClick={handleDeleteMember}
                            variant='contained'
                            className={classes.deleteMemberBtn}
                        >
                            {pending && <CircularProgress size={20} />}
                            Mời rời khỏi lớp
                        </Button>
                    )}
                </>
            )}
            {isInvited && (
                <Button
                    onClick={handleUnInviteJoinClass}
                    variant='outlined'
                    className={classes.invitedBtn}
                >
                    {pending && <CircularProgress color='inherit' size={20} />}
                    <CheckCircleOutline />
                    Đã mời
                </Button>
            )}
        </>
    );
};

ActionButton.propTypes = {
    isJoined: PropTypes.bool.isRequired,
    isInvited: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    joinedId: PropTypes.string,
};

export default ActionButton;
