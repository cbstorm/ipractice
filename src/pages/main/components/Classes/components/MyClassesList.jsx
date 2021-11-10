import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SUCCESS } from '../../../../../constant';
import {
    getMyClassListAction,
    myClassListSelector,
} from '../../../../../redux/reducers/myClassList.reducer';
import ClassList from './ClassList';

const MyClassesList = () => {
    const dispatch = useDispatch();
    const listClasses = useSelector(myClassListSelector);
    const [pending, setPending] = useState(false);

    const getMyClasses = () => {
        setPending(true);
        dispatch(getMyClassListAction()).then((result) => {
            if (result.payload.status === SUCCESS) {
                setPending(false);
            }
        });
    };

    useEffect(() => {
        getMyClasses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ClassList
            listClasses={listClasses}
            emptyText='Bạn chưa có lớp học nào'
            pending={pending}
            title='Lớp học của bạn'
        />
    );
};

export default MyClassesList;
