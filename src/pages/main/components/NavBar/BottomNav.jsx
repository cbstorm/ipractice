import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    ClassOutlined,
    CreateOutlined,
    HomeOutlined,
    SearchOutlined,
} from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        zIndex: 2,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
}));

export default function BottomNav() {
    const classes = useStyles();
    const { url } = useRouteMatch();
    const { pathname } = useLocation();
    const history = useHistory();
    const [value, setValue] = React.useState(pathname);

    const handleChange = (event, newValue) => {
        history.push(`${newValue}`);
        setValue(newValue);
    };
    useEffect(() => {
        setValue(pathname);
    }, [pathname]);

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            className={classes.root}
        >
            <BottomNavigationAction
                label='Trang chủ'
                value={url}
                icon={<HomeOutlined color='inherit' />}
            />
            <BottomNavigationAction
                label='Bài tập'
                value={`${url}/practices`}
                icon={<CreateOutlined color='inherit' />}
            />
            <BottomNavigationAction
                label='Lớp học'
                value={`${url}/classes`}
                icon={<ClassOutlined color='inherit' />}
            />
            <BottomNavigationAction
                label='Tìm kiếm'
                value={`${url}/search`}
                icon={<SearchOutlined color='inherit' />}
            />
        </BottomNavigation>
    );
}
