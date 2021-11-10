import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        textAlign: 'center',
        fontSize: 14,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        color: '#333',
    },
}));

const EmptyText = ({ text }) => {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.root} component='span'>
                {text}
            </Typography>
        </>
    );
};

EmptyText.propTypes = {
    text: PropTypes.string.isRequired,
};

export default EmptyText;
