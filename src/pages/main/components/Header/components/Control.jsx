import { makeStyles } from '@material-ui/core';
import React from 'react';
import Notification from './Notification';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const Control = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Notification />
        </div>
    );
};

export default Control;
