import { CircularProgress, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
}));

const PendingSpinner = ({ size }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress size={size ? size : 20} />
        </div>
    );
};

PendingSpinner.propTypes = {
    size: PropTypes.number,
};

export default PendingSpinner;
