import {
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    ListItem,
    makeStyles,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { CancelPresentation } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rejectRequestJoinClass } from '../../../../../apis';
import { SUCCESS, wsEvent } from '../../../../../constant';
import {
    handleAcceptAction,
    handleRejectAction,
} from '../../../../../redux/reducers/classDetails.reducer';
import { socketSelector } from '../../../../../redux/reducers/socketio.reducer';
import JoinRequestAction from './JoinRequestAction';
import MemberItem from './MemberItem';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    dialogContent: {
        width: 500,
        maxHeight: 400,
        paddingBottom: 50,
        overflowY: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            maxHeight: '100vh',
            paddingInline: 50,
            paddingBottom: 50,
            paddingTop: 50,
        },
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeBtn: {
        marginLeft: 'auto',
    },
}));

const RequestListDialog = ({ open, onClose, requestList }) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const { socket } = useSelector(socketSelector);
    const dispatch = useDispatch();

    const handleAcceptRequest = (classId, request) => {
        if (socket) {
            socket.emit(
                wsEvent.ACCEPT_REQUEST_JOIN_CLASS,
                { classId, request },
                (response) => {
                    if (response.status === SUCCESS) {
                        dispatch(handleAcceptAction(request));
                    }
                }
            );
        }
    };

    const handleRejectRequest = async (classId, request) => {
        const response = await rejectRequestJoinClass(classId, request._id);
        if (response.data.status === SUCCESS) {
            dispatch(handleRejectAction(request));
        }
    };

    return (
        <Dialog className={classes.root} open={open} fullScreen={fullScreen}>
            <IconButton onClick={onClose} className={classes.closeBtn}>
                <CancelPresentation color='error' />
            </IconButton>
            <DialogTitle>Yêu cầu tham gia lớp học</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Container className={classes.list}>
                    {requestList.length > 0 &&
                        requestList.map((requestItem) => {
                            return (
                                <ListItem
                                    className={classes.listItem}
                                    key={requestItem._id}
                                >
                                    <MemberItem member={requestItem} />
                                    <JoinRequestAction
                                        classId={requestItem.classEntity}
                                        request={requestItem}
                                        onAccept={handleAcceptRequest}
                                        onReject={handleRejectRequest}
                                    />
                                </ListItem>
                            );
                        })}
                </Container>
            </DialogContent>
        </Dialog>
    );
};

RequestListDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    requestList: PropTypes.array.isRequired,
};

export default RequestListDialog;
