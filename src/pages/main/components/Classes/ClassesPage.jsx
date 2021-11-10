import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import AddClassButton from './components/AddClassButton';
import MyClassesList from './components/MyClassesList';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}));

export default function ClassesPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AddClassButton />
            <MyClassesList />
        </div>
    );
}
