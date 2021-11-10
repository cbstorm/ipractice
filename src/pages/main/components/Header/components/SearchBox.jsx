import { Divider, IconButton, InputBase, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '40%',
        marginRight: 'auto',
    },
    search: {
        display: 'flex',
        padding: '2px 4px',
        alignItems: 'center',
        width: '100%',
        borderRadius: 40,
        boxShadow: 'none',
        backgroundColor: theme.palette.grey[200],
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    input: {
        width: '100%',
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function SearchBox() {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState('');
    const history = useHistory();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/main/search?q=${searchQuery}`);
        return;
    };

    return (
        <form className={classes.root}>
            <Paper className={classes.search}>
                <InputBase
                    onChange={handleSearchChange}
                    className={classes.input}
                    placeholder='Tìm kiếm'
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                />
                <Divider className={classes.divider} orientation='vertical' />
                <IconButton
                    color='primary'
                    className={classes.iconButton}
                    aria-label='directions'
                    onClick={handleSubmit}
                    type='submit'
                >
                    <SearchOutlined />
                </IconButton>
            </Paper>
        </form>
    );
}
