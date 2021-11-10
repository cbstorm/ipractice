import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClassPracticeList } from '../../../../../apis';
import { SUCCESS } from '../../../../../constant';
import EmptyText from '../../../commonComponents/EmptyText';
import PracticeList from '../../../commonComponents/PracticeList';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

const ClassPracticeList = () => {
    const classes = useStyles();
    const { classId } = useParams();
    const limit = 5;
    const [practiceList, setPracticeList] = useState([]);
    const [isPending, setPending] = useState(false);
    const [page, setPage] = useState(0);
    const [exhausted, setExhausted] = useState(false);
    const handleLoadmore = () => {
        getClassPracticeListHandler(page, limit);
    };

    const getClassPracticeListHandler = async (page, limit) => {
        setPending(true);
        const response = await getClassPracticeList(classId, page, limit);
        if (response.data.status === SUCCESS) {
            setPracticeList((prev) => {
                return [...prev, ...response.data.data];
            });
            if (response.data.data.length < limit) {
                setExhausted(true);
            }
            setPage((page) => page + 1);
            setPending(false);
        }
    };

    useEffect(() => {
        setPracticeList([]);
        getClassPracticeListHandler(0, limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classId]);
    return (
        <div className={classes.root}>
            <PracticeList
                title='Danh sách bài tập'
                practiceList={practiceList}
                isPending={isPending}
                exhausted={exhausted}
                onLoadmore={handleLoadmore}
                isInClass={true}
            />
            {practiceList?.length === 0 && (
                <EmptyText text='Lớp học này chưa có bài tập nào' />
            )}
        </div>
    );
};

export default ClassPracticeList;
