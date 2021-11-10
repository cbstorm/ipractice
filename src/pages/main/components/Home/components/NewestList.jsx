import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FAILURE } from '../../../../../constant';
import {
    getNewestPracticeListAction,
    loadmoreNewestPracticesAction,
    practiceListSelector,
} from '../../../../../redux/reducers/practiceList.reducer';
import PracticeList from '../../../commonComponents/PracticeList';

const NewestList = () => {
    const dispatch = useDispatch();
    const limit = 6;
    const practiceList = useSelector(practiceListSelector);
    const [isPending, setPending] = useState(false);
    const [page, setPage] = useState(0);
    const [exhausted, setExhausted] = useState(true);
    const [errorResponse, setErrorResponse] = useState();
    const handleLoadmore = () => {
        setPending(true);
        dispatch(loadmoreNewestPracticesAction({ page, limit })).then(
            (result) => {
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
                setPending(false);
            }
        );
    };

    const getNewestPracticeList = (page, limit) => {
        setPending(true);
        dispatch(getNewestPracticeListAction({ page, limit })).then(
            (result) => {
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
                setPending(false);
            }
        );
    };

    useEffect(() => {
        getNewestPracticeList(page, limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {practiceList?.length > 0 && (
                <PracticeList
                    title='Mới nhất'
                    practiceList={practiceList}
                    pending={isPending}
                    onLoadmore={handleLoadmore}
                    exhausted={exhausted}
                    errorResponse={errorResponse}
                />
            )}
        </>
    );
};

export default NewestList;
