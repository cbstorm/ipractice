import {
    Button,
    IconButton,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import { GroupAdd } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { classDetailsSelector } from '../../../../../redux/reducers/classDetails.reducer';
import { getAdmin, getMembers } from '../../../../../utils';
import EmptyText from '../../../commonComponents/EmptyText';
import AddMemberDialog from './AddMemberDialog';
import MemberItem from './MemberItem';
import RequestListDialog from './RequestListDialog';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: theme.spacing(3),
    },
    managerList: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
    },
    memberList: {
        padding: theme.spacing(2),
        minHeight: 100,
        maxHeight: 300,
        overflowX: 'hidden',
        overflowY: 'auto',
        marginBottom: theme.spacing(3),
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 500,
        marginBottom: theme.spacing(1),
    },
}));

const MemberList = () => {
    const classes = useStyles();
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const [open, setOpen] = useState(false);
    const [openRequestList, setOpenRequestList] = useState(false);
    const classDetailsState = useSelector(classDetailsSelector);
    const { joinRequest, joined } = classDetailsState || {};

    const handleOpenAddMemberDialog = () => {
        setOpen(true);
    };

    const handleCloseAddMemberDialog = () => {
        setOpen(false);
    };

    const handleOpenRequestList = () => {
        setOpenRequestList(true);
    };
    const handleCloseRequestListDialog = () => {
        setOpenRequestList(false);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.managerList}>
                <Typography className={classes.title} component='h6'>
                    Chủ nhiệm lớp
                </Typography>
                {joined?.length && <MemberItem member={getAdmin(joined)} />}
            </Paper>
            <Paper className={classes.memberList}>
                <div className={classes.header}>
                    <Typography className={classes.title} component='h6'>
                        Học viên
                    </Typography>
                    {userProfile._id === getAdmin(joined)?.userId && (
                        <>
                            <IconButton onClick={handleOpenAddMemberDialog}>
                                <GroupAdd />
                            </IconButton>
                            <AddMemberDialog
                                open={open}
                                onClose={handleCloseAddMemberDialog}
                            />
                        </>
                    )}
                </div>
                {joined?.length === 1 && <EmptyText text='Chưa có học viên' />}
                {joined?.length &&
                    getMembers(joined).map((memberItem) => {
                        return (
                            <MemberItem
                                key={memberItem._id}
                                member={memberItem}
                            />
                        );
                    })}
            </Paper>
            {userProfile._id === getAdmin(joined)?.userId &&
                joinRequest?.length > 0 && (
                    <Paper className={classes.memberList}>
                        <div className={classes.header}>
                            <Typography
                                className={classes.title}
                                component='h6'
                            >
                                Yêu cầu tham gia
                            </Typography>

                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={handleOpenRequestList}
                            >
                                xem
                            </Button>
                            <RequestListDialog
                                requestList={joinRequest}
                                open={openRequestList}
                                onClose={handleCloseRequestListDialog}
                            />
                        </div>
                        {joinRequest?.length > 0 &&
                            joinRequest.map((joinRequestItem) => {
                                return (
                                    <MemberItem
                                        key={joinRequestItem._id}
                                        member={joinRequestItem}
                                    />
                                );
                            })}
                    </Paper>
                )}
        </div>
    );
};

export default MemberList;
