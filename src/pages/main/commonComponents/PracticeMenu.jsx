import {
    ClickAwayListener,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
} from '@material-ui/core';
import { Delete, MoreVert } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMyPracticeAction } from '../../../redux/reducers/practiceList.reducer';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        marginLeft: 'auto',
    },
    menu: {
        fontSize: 10,
        position: 'absolute',
        borderRadius: 10,
        right: 0,
        zIndex: 1,
        maxWidth: 150,
        backgroundColor: theme.palette.grey[100],
    },
    delete: {
        color: theme.palette.error.main,
    },
    menuBtn: {
        borderRadius: 50,
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
}));

const PracticeMenu = ({ practiceId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const showMenu = () => {
        setOpen((prev) => !prev);
    };
    const handleClickAway = () => {
        setOpen(false);
    };
    const deletePracticeHandler = () => {
        dispatch(deleteMyPracticeAction(practiceId));
    };
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
                <IconButton
                    className={classes.menuBtn}
                    variant='contained'
                    onClick={showMenu}
                >
                    <MoreVert />
                </IconButton>
                {open && (
                    <div className={classes.menu}>
                        <List component='nav'>
                            <ListItem
                                onClick={deletePracticeHandler}
                                button
                                className={classes.delete}
                            >
                                <ListItemIcon>
                                    <Delete color='error' />
                                </ListItemIcon>
                                <ListItemText primary='Xóa' />
                            </ListItem>
                        </List>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default PracticeMenu;
