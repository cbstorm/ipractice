import { Button, Container, Grid, makeStyles } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import {
    classDetailsSelector,
    getClassDetailsAction,
} from '../../../../redux/reducers/classDetails.reducer';
import EmptyText from '../../commonComponents/EmptyText';
import ClassInfo from './components/ClassInfo';
import ClassPracticeList from './components/ClassPracticeList';
import DeleteClassBtn from './components/DeleteClassBtn';
import LeaveClassBtn from './components/LeaveClassBtn';
import MemberList from './components/MemberList';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    btn: {
        width: '30%',
        marginBottom: theme.spacing(2),
        color: theme.palette.grey[400],
        display: 'flex',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            '& > *': {
                color: theme.palette.grey[50],
            },
        },
        borderRadius: 20,
        backgroundColor: theme.palette.secondary.dark,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginTop: theme.spacing(4),
        },
    },
}));

const ClassDetailsPage = () => {
    const { classId } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const classDetailsState = useSelector(classDetailsSelector);
    const { isAdmin, isJoined, joined, invited, joinRequest } =
        classDetailsState || {};

    const getClassDetails = async () => {
        dispatch(getClassDetailsAction(classId)).then((result) => {
            if (!result.payload) {
                history.push('/main/classes');
            }
        });
    };

    useEffect(() => {
        getClassDetails();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classId]);
    return (
        <Container className={classes.root}>
            <ClassInfo />
            <Grid container wrap='wrap-reverse' spacing={2}>
                <Grid item xs={12} sm={8} md={9}>
                    {isAdmin && (
                        <Button
                            className={classes.btn}
                            component={RouterLink}
                            to={`/main/practices/create/${classId}`}
                        >
                            <AddCircle fontSize='large' />
                            <span className={classes.text}>Tạo bài tập</span>
                        </Button>
                    )}
                    {!isJoined && !isAdmin && (
                        <EmptyText text='Hãy tham gia lớp học để xem những bài tập' />
                    )}
                    {(isJoined || isAdmin) && <ClassPracticeList />}
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    {classDetailsState && (
                        <MemberList
                            memberList={joined}
                            invitedList={invited}
                            joinRequestList={joinRequest}
                        />
                    )}
                    {!isAdmin && isJoined && <LeaveClassBtn />}
                    {isAdmin && <DeleteClassBtn />}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ClassDetailsPage;
