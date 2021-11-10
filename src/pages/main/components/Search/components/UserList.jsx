import { Container, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import User from '../../../commonComponents/User';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    list: {
        listStyleType: 'none',
    },
    item: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

const UserList = ({ userList }) => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Typography className={classes.heading} variant='h5' component='h6'>
                Người dùng
            </Typography>
            <Container>
                <ul className={classes.list}>
                    {userList.map((userItem) => {
                        return (
                            <li className={classes.item} key={userItem._id}>
                                <User userProfile={userItem} />
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </Container>
    );
};

UserList.propTypes = {
    userList: PropTypes.array.isRequired,
};

export default UserList;
