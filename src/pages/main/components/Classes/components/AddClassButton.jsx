import { Button, makeStyles } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import React from 'react';
import CreateDialog from './CreateDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3),
    },
}));

const AddClassButton = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const openCreateDialog = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Button
                onClick={openCreateDialog}
                color='secondary'
                variant='contained'
            >
                <AddBox /> Tạo lớp học mới
            </Button>
            <CreateDialog open={open} onClose={handleClose} />
        </div>
    );
};

export default AddClassButton;
