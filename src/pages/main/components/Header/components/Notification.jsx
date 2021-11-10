import {
    Badge,
    ClickAwayListener,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    deleteAllNotifications,
    getAllNotifications,
    readAllNotifications,
} from '../../../../../apis';
import { SUCCESS, wsEvent } from '../../../../../constant';
import { socketSelector } from '../../../../../redux/reducers/socketio.reducer';
import { countNewNotification } from '../../../../../utils';
import NotificationList from './NotificationList';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#fff',
        marginRight: theme.spacing(2),
        position: 'relative',
    },
    icon: {
        color: '#fff',
    },
}));

const Notification = () => {
    const classes = useStyles();
    const [notificationList, setNotificationList] = useState([]);
    const [newCount, setNewCount] = useState(0);
    const { socket } = useSelector(socketSelector);
    const [open, setOpen] = useState(false);

    const getNotifications = async () => {
        const response = await getAllNotifications();
        if (response.data.status === SUCCESS) {
            setNotificationList((prev) => {
                return [...response.data.data, ...prev];
            });
            setNewCount(countNewNotification(response.data.data));
        }
    };

    const handleDeleteAllNotifications = async () => {
        const response = await deleteAllNotifications();
        if (response.data.status === SUCCESS) {
            setNotificationList([]);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            getNotifications();
        }, 3000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on(wsEvent.NOTIFICATION, (notificationData) => {
                setNotificationList((prev) => {
                    return [notificationData, ...prev];
                });
                setNewCount((count) => count + 1);
            });
        }
    }, [socket]);

    const openNotificationList = async () => {
        setOpen((open) => !open);
        if (!open) {
            if (newCount > 0) {
                await readAllNotifications();
                setNewCount(0);
            }
        }
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
                <IconButton onClick={openNotificationList}>
                    <Badge badgeContent={newCount} color='secondary'>
                        <Notifications
                            className={classes.icon}
                            fontSize='medium'
                        />
                    </Badge>
                </IconButton>
                {open && (
                    <NotificationList
                        notificationList={notificationList}
                        onClickAway={handleClickAway}
                        onDeleteAllNotifications={handleDeleteAllNotifications}
                    />
                )}
            </div>
        </ClickAwayListener>
    );
};

export default Notification;
