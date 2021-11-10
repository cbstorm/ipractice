import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AccountPage from './Account/AccountPage';
import ClassDetailsPage from './Classes/ClassDetailsPage';
import ClassesPage from './Classes/ClassesPage';
import HomePage from './Home/HomePage';
import CreateAndEditPage from './Practices/CreateAndEditPage';
import DoPractice from './Practices/DoPractice';
import PracticeDetailsPage from './Practices/PracticeDetailsPage';
import PracticesPage from './Practices/PraticesPage';
import ProfilePage from './Profile/ProfilePage';
import SearchPage from './Search/SearchPage';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(12),
        padding: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1),
            paddingTop: theme.spacing(10),
        },
    },
    pdbt: {
        height: 0,
        [theme.breakpoints.down('md')]: {
            height: theme.spacing(7),
        },
    },
}));

export default function MainContent() {
    const classes = useStyles();
    const { path } = useRouteMatch();
    return (
        <div className={classes.root}>
            <Switch>
                <Route path={`${path}`} component={HomePage} exact />
                <Route
                    path={`${path}/practices`}
                    component={PracticesPage}
                    exact
                />
                <Route
                    path={`${path}/practices/create/:classId`}
                    component={CreateAndEditPage}
                />
                <Route
                    path={`${path}/practices/create`}
                    component={CreateAndEditPage}
                />
                <Route
                    path={`${path}/practices/:practiceId`}
                    component={PracticeDetailsPage}
                    exact
                />
                <Route
                    path={`${path}/practices/doPractice/:practiceId`}
                    component={DoPractice}
                />
                <Route
                    path={`${path}/classes/:classId`}
                    component={ClassDetailsPage}
                />
                <Route path={`${path}/classes`} component={ClassesPage} />

                <Route path={`${path}/search`} component={SearchPage} />

                <Route
                    path={`${path}/profile/:userId`}
                    component={ProfilePage}
                />
                <Route path={`${path}/account`} component={AccountPage} />
            </Switch>
            <div className={classes.pdbt}></div>
        </div>
    );
}
