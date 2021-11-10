import { makeStyles, Typography } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        textAlign: 'center',
        fontSize: 14,
        color: theme.palette.error.dark,
    },
}));

const ErrorMessage = ({ errorMessage }) => {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.root} component='span'>
                {!errorMessage && <Error color='inherit' />}
                {errorMessage ? errorMessage : 'Có lỗi xảy ra'}
            </Typography>
        </>
    );
};

ErrorMessage.propTypes = {
    errorMessage: PropTypes.string,
};

export default ErrorMessage;
