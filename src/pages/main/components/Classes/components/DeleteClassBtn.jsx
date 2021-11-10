import { Button, makeStyles } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import React, { useState } from 'react';
import DeleteClassConfirmDialog from './DeleteClassConfirmDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        width: '100%',
    },
    deleteBtn: {
        width: '100%',
        border: '1px solid rgb(212, 33, 33)',
        color: theme.palette.error.dark,
    },
}));

const DeleteClassBtn = () => {
    const classes = useStyles();
    const [openLeaveConfirm, setOpenLeaveClassConfirm] = useState(false);

    const handleOpen = () => {
        setOpenLeaveClassConfirm(true);
    };
    const handleClose = () => {
        setOpenLeaveClassConfirm(false);
    };

    return (
        <div className={classes.root}>
            <Button
                className={classes.deleteBtn}
                variant='outlined'
                onClick={handleOpen}
            >
                <Cancel />
                Xóa lớp học
            </Button>
            <DeleteClassConfirmDialog
                open={openLeaveConfirm}
                onClose={handleClose}
            />
        </div>
    );
};

export default DeleteClassBtn;
