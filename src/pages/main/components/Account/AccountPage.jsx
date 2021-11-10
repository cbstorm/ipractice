import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import AvatarImage from './components/AvatarImage';
import Info from './components/Info';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    underline: {
        width: '80%',
        height: 1,
        backgroundColor: '#afc3ce',
        marginTop: theme.spacing(3),
    },
    title: {
        width: '100%',
        textAlign: 'left',
    },
}));

export default function Account() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Typography className={classes.title} variant='h5' component='h4'>
                Thông tin tài khoản
            </Typography>
            <AvatarImage />
            <div className={classes.underline}></div>
            <Info />
        </Container>
    );
}
