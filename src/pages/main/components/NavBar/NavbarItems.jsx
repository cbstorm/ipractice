import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    AddCircle,
    ClassOutlined,
    CreateOutlined,
    HomeOutlined,
} from '@material-ui/icons';
import React from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    btn: {
        padding: theme.spacing(3),
        width: 200,
        marginBottom: theme.spacing(2),
        color: theme.palette.grey[400],
        display: 'flex',
        justifyContent: 'flex-start',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            '& > *': {
                color: theme.palette.grey[50],
            },
        },
        borderRadius: 20,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    create: {
        width: 150,
        backgroundColor: theme.palette.secondary.dark,
        padding: theme.spacing(2),
    },
    text: {
        marginRight: theme.spacing(2),
        textAlign: 'center',
    },
    createIcon: {
        color: theme.palette.grey[300],
    },
}));

export default function NavbarItems() {
    const classes = useStyles();
    const { url } = useRouteMatch();
    return (
        <div className={classes.root}>
            <Button
                component={RouterLink}
                to={`${url}/practices/create`}
                className={`${classes.btn} ${classes.create}`}
            >
                <span className={classes.text}>Tạo bài tập</span>
                <AddCircle className={classes.createIcon} fontSize='large' />
            </Button>
            <Button
                component={RouterLink}
                to={`${url}`}
                className={classes.btn}
            >
                <HomeOutlined className={classes.icon} color='inherit' />
                Trang chủ
            </Button>
            <Button
                component={RouterLink}
                to={`${url}/practices`}
                className={classes.btn}
            >
                <CreateOutlined className={classes.icon} color='inherit' />
                Bài tập
            </Button>
            <Button
                component={RouterLink}
                to={`${url}/classes`}
                className={classes.btn}
                variant='text'
            >
                <ClassOutlined className={classes.icon} color='inherit' />
                Lớp học
            </Button>
        </div>
    );
}
