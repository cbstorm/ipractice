import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        marginRight: theme.spacing(1),
    },
    link: {
        textDecoration: 'none',
    },
    name: {
        fontSize: 18,
        fontWeight: 500,
        color: '#fff',
        '&:hover': {
            color: theme.palette.primary.light,
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    nameOnItem: {
        fontSize: 18,
        fontWeight: 500,
        padding: theme.spacing(1),
        color: (props) => (props.nameColor ? props.nameColor : '#333'),
        '&:hover': {
            color: theme.palette.primary.light,
        },
    },
}));

const User = ({ userProfile, isHeader, hideName, nameColor }) => {
    const classes = useStyles({ nameColor });

    return (
        <div className={classes.root}>
            <Link
                to={`/main/profile/${userProfile?._id}`}
                className={classes.link}
            >
                <Avatar
                    className={classes.avatar}
                    alt={userProfile?.name}
                    src={userProfile?.avatarUrl}
                >
                    {!userProfile?.avatarUrl
                        ? userProfile?.name.split('')[0].toUpperCase()
                        : ''}
                </Avatar>
            </Link>
            {!hideName && (
                <Link
                    to={`/main/profile/${userProfile?._id}`}
                    className={`${
                        isHeader ? classes.name : classes.nameOnItem
                    } ${classes.link}`}
                >
                    {userProfile?.name}
                </Link>
            )}
        </div>
    );
};

User.propTypes = {
    userProfile: PropTypes.any,
    isHeader: PropTypes.bool,
    hideName: PropTypes.bool,
};

export default User;
