import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FAILURE } from '../../../../../constant';
import {
    getMyPracticesListAction,
    loadmorePracticesAction,
    practiceListSelector,
} from '../../../../../redux/reducers/practiceList.reducer';
import EmptyText from '../../../commonComponents/EmptyText';
import PracticeList from '../../../commonComponents/PracticeList';

const MyPracticeList = () => {
    const dispatch = useDispatch();
    const limit = 5;
    const practiceList = useSelector(practiceListSelector);
    const [pending, setPending] = useState(false);
    const [page, setPage] = useState(0);
    const [exhausted, setExhausted] = useState(true);
    const [errorResponse, setErrorResponse] = useState();
    const handleLoadmore = () => {
        setPending(() => true);
        dispatch(loadmorePracticesAction({ page, limit })).then((result) => {
            if (result.payload.status === FAILURE) {
                setErrorResponse((prev) => {
                    return { ...prev, ...result.payload };
                });
                return;
            }
            if (result.payload.data.length < limit) {
                setExhausted(true);
            }
            setPage((page) => page + 1);
            setPending(() => false);
        });
    };

    const getMyPracticeList = (page, limit = 5) => {
        setPending(() => true);
        dispatch(getMyPracticesListAction({ page, limit })).then((result) => {
            if (result.payload.status === FAILURE) {
                setErrorResponse((prev) => {
                    return { ...prev, ...result.payload };
                });
                return;
            }
            if (result.payload.data.length >= limit) {
                setExhausted(false);
            }
            setPage((page) => page + 1);
            setPending(() => false);
        });
    };

    useEffect(() => {
        getMyPracticeList(page, limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <PracticeList
                title='Bài tập của bạn'
                practiceList={practiceList}
                pending={pending}
                exhausted={exhausted}
                errorResponse={errorResponse}
                onLoadmore={handleLoadmore}
            />
            {!pending && practiceList?.length === 0 && (
                <EmptyText text='Bạn chưa có bài tập nào cả' />
            )}
        </>
    );
};

export default MyPracticeList;
