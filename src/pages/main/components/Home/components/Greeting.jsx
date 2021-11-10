import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { gradientBackground } from '../../../../../theme/gradientColor';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        ...gradientBackground,
        textAlign: 'center',
        color: theme.palette.grey[300],
        borderRadius: 20,
        fontSize: 25,
        width: '40%',
        margin: 'auto',
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(2),
            fontSize: 20,
            width: '100%',
        },
    },
    name: {
        color: theme.palette.primary.light,
        fontWeight: 500,
        fontSize: 30,
        [theme.breakpoints.down('md')]: {
            fontSize: 25,
        },
    },
    question: {
        fontSize: 20,
        [theme.breakpoints.down('md')]: {
            fontSize: 15,
        },
    },
}));

export default function Greeting() {
    const classes = useStyles();
    const userProfile = JSON.parse(
        localStorage.getItem('userProfile') || 'null'
    );
    return (
        <div className={classes.root}>
            <div>
                Xin chào{', '}
                <span className={classes.name}>{userProfile?.name}</span> !
            </div>
            <span className={classes.question}>
                Chào mừng bạn đến với i-Practice !
            </span>
        </div>
    );
}
