import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import React from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import MyPracticeList from './components/MyPracticeList';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    btn: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(2),
        color: theme.palette.grey[400],
        display: 'flex',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            '& > *': {
                color: theme.palette.grey[50],
            },
        },
        borderRadius: 20,
        backgroundColor: theme.palette.secondary.dark,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    text: {
        marginRight: theme.spacing(2),
    },
}));

export default function PracticesPage() {
    const classes = useStyles();
    const { url } = useRouteMatch();
    return (
        <div className={classes.root}>
            <Button
                className={classes.btn}
                component={RouterLink}
                to={`${url}/create`}
            >
                <span className={classes.text}>Tạo bài tập</span>
                <AddCircle fontSize='large' />
            </Button>
            <MyPracticeList />
        </div>
    );
}
