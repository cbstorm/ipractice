import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { leaveClass } from '../../../../../apis';
import { SUCCESS } from '../../../../../constant';

const LeaveClassComfirmDialog = ({ classId, open, onClose }) => {
    const history = useHistory();

    const handleClose = () => {
        onClose();
    };

    const handleLeaveClass = async () => {
        const response = await leaveClass(classId);
        if (response.data.status === SUCCESS) {
            history.push('/main/classes');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='leave-class-alert'
        >
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    Bạn chắc chắn muốn rời khỏi lớp học này?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Hủy
                </Button>
                <Button onClick={handleLeaveClass} color='primary' autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LeaveClassComfirmDialog;
