import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@material-ui/core';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { deleteClass } from '../../../../../apis';
import { SUCCESS } from '../../../../../constant';

const DeleteClassConfirmDialog = ({ open, onClose }) => {
    const { classId } = useParams();
    const history = useHistory();

    const handleClose = () => {
        onClose();
    };

    const handleDeleteClass = async () => {
        const response = await deleteClass(classId);
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
                    Bạn chắc chắn muốn xóa lớp học này?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Hủy
                </Button>
                <Button onClick={handleDeleteClass} color='primary' autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteClassConfirmDialog;
