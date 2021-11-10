import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import UserInfo from './components/UserInfo';
import UserPracticeList from './components/UserPracticeList';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
}));

export default function Profile() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <UserInfo />
            <UserPracticeList />
        </Container>
    );
}
