import {
    CircularProgress,
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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllFriends } from '../../../../../apis';
import { SUCCESS } from '../../../../../constant';
import { classDetailsSelector } from '../../../../../redux/reducers/classDetails.reducer';
import EmptyText from '../../../commonComponents/EmptyText';
import User from '../../../commonComponents/User';
import ActionButton from './ActionButton';

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
    },
    closeBtn: {
        marginLeft: 'auto',
    },
}));

const AddMemberDialog = ({ open, onClose }) => {
    const classes = useStyles();
    const theme = useTheme();
    const currentUserProfile = JSON.parse(
        localStorage.getItem('userProfile') || 'null'
    );
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [pending, setPending] = useState(false);
    const [friendList, setFriendList] = useState([]);
    const classDetailsState = useSelector(classDetailsSelector);
    const { joined, invited } = classDetailsState || {};

    const getAllFriendsHandler = async () => {
        setPending(true);
        const response = await getAllFriends();
        if (response.data.status === SUCCESS) {
            setFriendList((prev) => {
                return [...prev, ...response.data.data];
            });
            setPending(false);
        }
    };

    const handleClose = () => {
        onClose();
    };
    useEffect(() => {
        getAllFriendsHandler();
    }, []);

    return (
        <Dialog className={classes.root} open={open} fullScreen={fullScreen}>
            <IconButton onClick={handleClose} className={classes.closeBtn}>
                <CancelPresentation color='error' />
            </IconButton>
            <DialogTitle>Thêm thành viên</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Container className={classes.list}>
                    {pending && <CircularProgress size='small' />}
                    {friendList.length === 0 && (
                        <EmptyText text='Bạn chưa có bạn bè' />
                    )}
                    {friendList.length > 0 &&
                        friendList.map((friendItem) => {
                            const isInvited = invited?.find(
                                (invitedItem) =>
                                    invitedItem.userId ===
                                    (friendItem.inviter._id !==
                                    currentUserProfile?._id
                                        ? friendItem.inviter._id
                                        : friendItem.receiver._id)
                            );
                            const isJoined = joined?.find(
                                (joinedItem) =>
                                    joinedItem.userId ===
                                    (friendItem.inviter._id !==
                                    currentUserProfile?._id
                                        ? friendItem.inviter._id
                                        : friendItem.receiver._id)
                            );
                            return (
                                <ListItem
                                    className={classes.listItem}
                                    key={friendItem._id}
                                >
                                    <User
                                        userProfile={
                                            friendItem.inviter._id !==
                                            currentUserProfile?._id
                                                ? friendItem.inviter
                                                : friendItem.receiver
                                        }
                                    />
                                    <ActionButton
                                        joinedId={
                                            isJoined ? isJoined._id : undefined
                                        }
                                        isJoined={Boolean(isJoined)}
                                        isInvited={Boolean(isInvited)}
                                        userId={
                                            friendItem.inviter._id !==
                                            currentUserProfile?._id
                                                ? friendItem.inviter._id
                                                : friendItem.receiver._id
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                </Container>
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberDialog;
