import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '84%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '16%',
        overflowY: 'auto',
        backgroundColor: theme.palette.grey[200],
        borderRadius: '40px 0 0 40px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: 0,
            borderRadius: 0,
        },
    },
}));

export default function RightPart(props) {
    const classes = useStyles();

    return <div className={classes.root}>{props.children}</div>;
}
