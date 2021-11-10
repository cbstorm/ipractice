import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserPracticeList } from '../../../../../apis';
import { FAILURE } from '../../../../../constant';
import PracticeList from '../../../commonComponents/PracticeList';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(4),
    },
}));

const UserPracticeList = () => {
    const classes = useStyles();
    const limit = 5;
    const { userId } = useParams();
    const [practiceList, setPracticeList] = useState([]);
    const [isPending, setPending] = useState(false);
    const [page, setPage] = useState(0);
    const [exhausted, setExhausted] = useState(true);
    const [errorResponse, setErrorResponse] = useState();
    const handleLoadmore = () => {
        getUserPracticeListHandler(page, limit);
    };

    const getUserPracticeListHandler = async (page, limit) => {
        setPending(true);
        const response = await getUserPracticeList(userId, page, limit);
        if (response.data.status === FAILURE) {
            setErrorResponse((prev) => {
                return { ...prev, ...response.data };
            });
            return;
        }
        setPracticeList((prev) => {
            return [...prev, ...response.data.data];
        });
        if (!response.data.data.length < limit) {
            setExhausted(false);
        }
        setPage((page) => page + 1);
        setPending(false);
    };

    useEffect(() => {
        setPracticeList([]);
        getUserPracticeListHandler(0, limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
    return (
        <div className={classes.root}>
            <PracticeList
                title='Danh sách bài tập'
                practiceList={practiceList}
                isPending={isPending}
                exhausted={exhausted}
                errorResponse={errorResponse}
                onLoadmore={handleLoadmore}
            />
        </div>
    );
};

export default UserPracticeList;
