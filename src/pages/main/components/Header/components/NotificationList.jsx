import { Button, List, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import NotificationType from '../../../../../constant/notificationType.constant';
import EmptyText from '../../../commonComponents/EmptyText';
import AcceptInviteFriendNotification from './NotificationItem/AcceptInviteFriendNotification';
import AcceptJoinClassNotification from './NotificationItem/AcceptJoinClassNotification';
import AcceptRequestJoinClassNotification from './NotificationItem/AcceptRequestJoinClassNotification';
import AddFriendNotification from './NotificationItem/AddFriendNotification';
import DiscussPracticeNotifcation from './NotificationItem/DiscussPracticeNotifcation';
import DonePracticeNotification from './NotificationItem/DonePracticeNotification';
import InviteJoinClassNotification from './NotificationItem/InviteJoinClassNotification';
import JoinClassRequestNotification from './NotificationItem/JoinClassRequestNotification';

const width = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        width: width,
        backgroundColor: theme.palette.background.paper,
        position: 'absolute',
        top: '100%',
        left: -(width / 2),
        zIndex: 5,
        borderRadius: 10,
        maxHeight: 500,
        overflowY: 'auto',
    },
    deleteAllBtn: {
        paddingRight: theme.spacing(2),
        textAlign: 'right',
        color: '#1c6ae6',
    },
    inline: {
        display: 'inline',
    },
}));

const NotificationList = ({
    notificationList,
    onClickAway,
    onDeleteAllNotifications,
}) => {
    const classes = useStyles();
    console.log(notificationList.length === 0);
    return (
        <List className={classes.root}>
            {notificationList.length === 0 && (
                <EmptyText text='Bạn không có thông báo nào' />
            )}
            {notificationList.length > 0 && (
                <div className={classes.deleteAllBtn}>
                    <Button onClick={onDeleteAllNotifications} color='inherit'>
                        Xóa tất cả
                    </Button>
                </div>
            )}
            {notificationList.length > 0 &&
                notificationList.map((notificationItem) => {
                    if (
                        notificationItem.notificationType ===
                        NotificationType.DISCUSS_PRACTICE
                    ) {
                        return (
                            <DiscussPracticeNotifcation
                                key={notificationItem._id}
                                onClickAway={onClickAway}
                                notificationItem={notificationItem}
                            />
                        );
                    }
                    if (
                        notificationItem.notificationType ===
                        NotificationType.DONE_PRACTICE
                    ) {
                        return (
                            <DonePracticeNotification
                                key={notificationItem._id}
                                onClickAway={onClickAway}
                                notificationItem={notificationItem}
                            />
                        );
                    }
                    if (
                        notificationItem.notificationType ===
                        NotificationType.ADD_FRIEND
                    ) {
                        return (
                            <AddFriendNotification
                                key={notificationItem._id}
                                onClickAway={onClickAway}
                                notificationItem={notificationItem}
                            />
                        );
                    }
                    if (
                        notificationItem.notificationType ===
                        NotificationType.ACCEPT_INVITE_FRIEND
                    ) {
                        return (
                            <AcceptInviteFriendNotification
                                key={notificationItem._id}
                                onClickAway={onClickAway}
                                notificationItem={notificationItem}
                            />
                        );
                    }
                    if (
                        notificationItem.notificationType ===
                        NotificationType.INVITE_JOIN_CLASS
                    ) {
                        return (
                            <InviteJoinClassNotification
                                key={notificationItem._id}
                                onClickAway={onClickAway}
                                notificationItem={notificationItem}
                            />
                        );
                    }
                    if (
                        notificationItem.notificationType ===
                        NotificationType.ACCEPT_JOIN_CLASS
                    ) {
                        return (
                            <AcceptJoinClassNotification
                                key={notificationItem._id}
                                onClickAway={onClickAway}
                                notificationItem={notificationItem}
                            />
                        );
                    }
                    if (
                        notificationItem.notificationType ===
                        NotificationType.JOIN_CLASS_REQUEST
                    ) {
                        return (
                            <JoinClassRequestNotification
                                key={notificationItem._id}
                                onClickAway={onClickAway}
                                notificationItem={notificationItem}
                            />
                        );
                    }
                    if (
                        notificationItem.notificationType ===
                        NotificationType.ACCEPT_JOIN_CLASS_REQUEST
                    ) {
                        return (
                            <AcceptRequestJoinClassNotification
                                key={notificationItem._id}
                                onClickAway={onClickAway}
                                notificationItem={notificationItem}
                            />
                        );
                    }

                    return null;
                })}
        </List>
    );
};

NotificationList.propTypes = {
    notificationList: PropTypes.array,
    onDeleteAllNotifications: PropTypes.func,
};

export default NotificationList;
