import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Logo } from '../../../../assets';
import NavbarItems from './NavbarItems';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '16%',
        padding: theme.spacing(3),
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        zIndex: 10,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    logo: {
        width: '80%',
    },
    btn: {
        padding: theme.spacing(2),
        color: theme.palette.grey[400],
    },
}));

export default function NavbarLeft() {
    const classes = useStyles();
    const { url } = useRouteMatch();
    return (
        <div className={classes.root}>
            <Link to={`${url}`}>
                <img className={classes.logo} src={Logo} alt='logo' />
            </Link>
            <NavbarItems />
        </div>
    );
}
