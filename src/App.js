import { makeStyles } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/auth/AuthPage';
import MainRoute from './pages/main/MainRoute';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
    },
}));

function App() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Switch>
                <Route path='/' exact>
                    <Redirect to='/main' />
                </Route>
                <Route path='/main' component={MainRoute} />
                <Route path='/auth' component={AuthPage} />
            </Switch>
        </div>
    );
}

export default App;
