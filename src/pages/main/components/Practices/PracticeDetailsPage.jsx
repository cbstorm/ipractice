import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import Discussion from './components/PracticeDetails/Discussion';
import Info from './components/PracticeDetails/Info';
import LeaderBoard from './components/PracticeDetails/LeaderBoard';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const PracticeDetailsPage = () => {
    const classes = useStyles();
    const { practiceId } = useParams();

    return (
        <Container className={classes.root}>
            <Info practiceId={practiceId} />
            <LeaderBoard practiceId={practiceId} />
            <Discussion practiceId={practiceId} />
        </Container>
    );
};

export default PracticeDetailsPage;
