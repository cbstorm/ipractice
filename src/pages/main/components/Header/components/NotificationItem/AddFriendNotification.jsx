import {
    ListItem,
    ListItemText,
    makeStyles,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import User from '../../../../commonComponents/User';

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
}));

const AddFriendNotification = ({ notificationItem, onClickAway }) => {
    const classes = useStyles();
    const history = useHistory();

    const handleOnClick = () => {
        history.push(`/main/profile/${notificationItem.dispatcher._id}`);
        onClickAway();
    };

    return (
        <ListItem alignItems='flex-start' button onClick={handleOnClick}>
            <User userProfile={notificationItem.dispatcher} hideName={true} />
            <ListItemText
                secondary={
                    <>
                        <Typography
                            component='span'
                            variant='body2'
                            className={classes.inline}
                            color='textPrimary'
                        >
                            {notificationItem?.dispatcher.name}
                        </Typography>
                        {' -- Đã gửi lời mời kết bạn đến bạn'}
                    </>
                }
            />
        </ListItem>
    );
};

export default AddFriendNotification;
