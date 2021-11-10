import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../../assets';
import { gradientBackground } from '../../../../theme';
import User from '../../commonComponents/User';
import Control from './components/Control';
import SearchBox from './components/SearchBox';
import UserMenu from './components/UserMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '83%',
        position: 'fixed',
        zIndex: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2),
        ...gradientBackground,
        borderRadius: 50,
        border: `10px solid ${theme.palette.grey[200]}`,
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1),
            width: '97%',
        },
    },
    controlAndUser: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
}));

export default function Header() {
    const classes = useStyles();
    const userProfile = JSON.parse(
        localStorage.getItem('userProfile') || 'null'
    );
    return (
        <div className={classes.root}>
            <Link to='/'>
                <img className={classes.logo} src={Logo} alt='logo' />
            </Link>
            <SearchBox />
            <div className={classes.controlAndUser}>
                <Control />
                <User userProfile={userProfile} isHeader={true} />
                <UserMenu />
            </div>
        </div>
    );
}
