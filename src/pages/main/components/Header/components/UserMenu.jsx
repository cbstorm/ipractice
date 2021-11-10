import {
    Avatar,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    AccountBoxOutlined,
    ArrowDropDownOutlined,
    PowerSettingsNewOutlined,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    menu: {
        position: 'absolute',
        top: theme.spacing(7),
        right: 0,
        zIndex: 1,
        width: 250,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    exit: {
        color: theme.palette.error.main,
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        marginRight: theme.spacing(1),
    },
    menuBtn: {
        padding: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1),
        },
    },
    icon: {
        color: '#fff',
    },
}));

export default function UserMenu() {
    const classes = useStyles();
    const userProfile = JSON.parse(
        localStorage.getItem('userProfile') || 'null'
    );
    const { url } = useRouteMatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const showMenu = () => {
        setOpen((prev) => !prev);
    };
    const closeHandler = () => {
        setTimeout(() => {
            setOpen(false);
        }, 200);
    };
    const handleClickAway = () => {
        setOpen(false);
    };
    const logoutHandler = () => {
        localStorage.clear();
        history.push('/auth');
    };
    useEffect(() => {
        if (!userProfile) {
            history.push('/auth');
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
                <IconButton className={classes.menuBtn} onClick={showMenu}>
                    <ArrowDropDownOutlined className={classes.icon} />
                </IconButton>
                {open && (
                    <div className={classes.menu}>
                        <List component='nav'>
                            <Link
                                onClick={closeHandler}
                                className={classes.link}
                                to={`${url}/profile`}
                            >
                                <ListItem button>
                                    <Avatar
                                        className={classes.avatar}
                                        alt={userProfile.name}
                                        src={userProfile?.avatarUrl}
                                    >
                                        {!userProfile.avatarUrl
                                            ? userProfile.name
                                                  .split('')[0]
                                                  .toUpperCase()
                                            : ''}
                                    </Avatar>
                                    <ListItemText primary={userProfile.name} />
                                </ListItem>
                            </Link>
                            <Link
                                onClick={closeHandler}
                                className={classes.link}
                                to={`${url}/account`}
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountBoxOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary='Tài khoản' />
                                </ListItem>
                            </Link>
                            <Divider />
                            <ListItem
                                onClick={logoutHandler}
                                button
                                className={classes.exit}
                            >
                                <ListItemIcon>
                                    <PowerSettingsNewOutlined color='error' />
                                </ListItemIcon>
                                <ListItemText primary='Đăng xuất' />
                            </ListItem>
                        </List>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
}
