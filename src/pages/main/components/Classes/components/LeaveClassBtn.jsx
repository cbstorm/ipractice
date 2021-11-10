import { Button, makeStyles } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LeaveClassComfirmDialog from './LeaveClassComfirmDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        width: '100%',
    },
    leaveBtn: {
        width: '100%',
        border: '1px solid rgb(212, 33, 33)',
        color: theme.palette.error.dark,
    },
}));

const LeaveClassBtn = () => {
    const classes = useStyles();
    const { classId } = useParams();
    const [openLeaveConfirm, setOpenLeaveClassConfirm] = useState(false);

    const handleOpenLeaveClassConfirm = () => {
        setOpenLeaveClassConfirm(true);
    };
    const handleCloseLeaveClassConfirm = () => {
        setOpenLeaveClassConfirm(false);
    };

    return (
        <div className={classes.root}>
            <Button
                className={classes.leaveBtn}
                variant='outlined'
                onClick={handleOpenLeaveClassConfirm}
            >
                <ExitToApp />
                Rời khỏi lớp
            </Button>
            <LeaveClassComfirmDialog
                open={openLeaveConfirm}
                onClose={handleCloseLeaveClassConfirm}
                classId={classId}
            />
        </div>
    );
};

export default LeaveClassBtn;
