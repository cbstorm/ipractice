import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Greeting from './components/Greeting';
import NewestList from './components/NewestList';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
    },
}));

export default function HomePage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Greeting />
            <NewestList />
        </div>
    );
}
