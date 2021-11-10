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

const InviteJoinClassNotification = ({ notificationItem, onClickAway }) => {
    const classes = useStyles();
    const history = useHistory();

    const handleOnClick = () => {
        history.push(`/main/classes/${notificationItem.classId}`);
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
                        {' -- Đã mời bạn tham gia lớp học'}
                    </>
                }
            />
        </ListItem>
    );
};

export default InviteJoinClassNotification;
