import { CircularProgress, IconButton, makeStyles } from '@material-ui/core';
import { Cancel, CheckCircleOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    acceptBtn: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
        marginRight: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.success.light,
        },
    },
    rejectBtn: {
        backgroundColor: theme.palette.error.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
}));

const JoinRequestAction = ({ classId, request, onAccept, onReject }) => {
    const classes = useStyles();
    const [acceptPending, setAcceptPending] = useState(false);
    const [rejectPending, setRejectPending] = useState(false);

    const handleAccept = () => {
        setAcceptPending(true);
        onAccept(classId, request);
    };
    const handleReject = async () => {
        setRejectPending(true);
        onReject(classId, request);
    };

    return (
        <div className={classes.action}>
            <IconButton
                className={classes.acceptBtn}
                variant='contained'
                onClick={handleAccept}
            >
                {acceptPending && <CircularProgress size={20} />}
                {!acceptPending && <CheckCircleOutlined />}
            </IconButton>
            <IconButton
                className={classes.rejectBtn}
                variant='contained'
                onClick={handleReject}
            >
                {rejectPending && <CircularProgress size={20} />}
                {!rejectPending && <Cancel />}
            </IconButton>
        </div>
    );
};

JoinRequestAction.propTypes = {
    classId: PropTypes.string.isRequired,
    request: PropTypes.any.isRequired,
    onAccept: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
};

export default JoinRequestAction;
