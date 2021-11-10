import { Button, CircularProgress, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { getRecordList } from '../../../../../../apis';
import { FAILURE } from '../../../../../../constant';
import { getMedal } from '../../../../../../utils';
import ErrorMessage from '../../../../commonComponents/ErrorMessage';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: 250,
        maxHeight: 400,
        [theme.breakpoints.down('md')]: {
            width: '60%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        color: '#fff',
        width: '100%',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.light,
    },
    container: {
        maxHeight: 400,
    },
    tableHeader: {
        backgroundColor: '#ffcc06',
    },
    bottom: {
        display: 'flex',
        justifyContent: 'center',
    },
    message: {
        marginTop: theme.spacing(2),
    },
}));

export default function LeaderBoard({ practiceId }) {
    const classes = useStyles();
    const [pending, setPending] = useState(false);
    const [recordList, setRecordList] = useState([]);
    const [errorResponse, setErrorResponse] = useState();
    const [page, setPage] = useState(0);
    const [exhausted, setExhausted] = useState(false);
    const limit = 5;
    const getRecordListHandler = async (practiceId, page, limit) => {
        setPending(true);
        const response = await getRecordList(practiceId, page, limit);
        if (response.data.status === FAILURE) {
            setErrorResponse((prev) => {
                return { ...prev, ...response.data };
            });
            return;
        }
        setRecordList(() => {
            return [...response.data.data];
        });
        setPage((page) => page + 1);
        if (response.data.data.length < limit) {
            setExhausted(true);
        }
        setPending(false);
    };
    const handleLoadMore = () => {
        getRecordListHandler(page, limit);
    };

    useEffect(() => {
        getRecordListHandler(practiceId, 0, limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [practiceId]);

    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography color='inherit' variant='h6'>
                    THÀNH TÍCH
                </Typography>
            </div>
            {recordList.length === 0 && (
                <Typography className={classes.message}>
                    Chưa có ai làm bài tập này
                </Typography>
            )}
            {recordList.length !== 0 && (
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    className={classes.tableHeader}
                                    align='center'
                                >
                                    #
                                </TableCell>
                                <TableCell
                                    className={classes.tableHeader}
                                    align='center'
                                >
                                    Tên
                                </TableCell>
                                <TableCell
                                    className={classes.tableHeader}
                                    align='center'
                                >
                                    Số lần
                                </TableCell>
                                <TableCell
                                    className={classes.tableHeader}
                                    align='center'
                                >
                                    Tỉ lệ trung bình
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recordList.length > 0 &&
                                recordList.map((recordItem, index) => {
                                    return (
                                        <TableRow key={recordItem.user._id}>
                                            <TableCell align='center'>
                                                {getMedal(index)}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {recordItem.user.name}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {recordItem.count}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {recordItem.avgRatio}%
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {errorResponse && (
                                <TableRow>
                                    <ErrorMessage />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <div className={classes.bottom}>
                {!exhausted && (
                    <Button color='primary' onClick={handleLoadMore}>
                        {pending && <CircularProgress />}
                        Tải thêm
                    </Button>
                )}
            </div>
        </Paper>
    );
}
