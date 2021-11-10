import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import DiscussionForm from './DiscussionForm';
import DiscussionList from './DiscussionList';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        marginTop: theme.spacing(2),
    },
    header: {
        width: '100%',
    },
}));

const Discussion = ({ practiceId }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography className={classes.header} variant='h6' align='left'>
                Thảo luận
            </Typography>
            <DiscussionForm practiceId={practiceId} />
            <DiscussionList practiceId={practiceId} />
        </div>
    );
};

export default Discussion;
