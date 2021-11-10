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

const DonePracticeNotification = ({ notificationItem, onClickAway }) => {
    const classes = useStyles();
    const history = useHistory();

    const handleOnClick = () => {
        history.push(`/main/practices/${notificationItem.practice}`);
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
                        {' -- Đã hoàn thành bài tập của bạn'}
                    </>
                }
            />
        </ListItem>
    );
};

export default DonePracticeNotification;
