import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FAILURE } from '../../../../../../constant';
import {
    clearState,
    createPracticeAction,
    createPracticeSelector,
} from '../../../../../../redux/reducers/createPractice.reducer';
import { removeQuestionId } from '../../../../../../utils';
import ErrorMessage from '../../../../commonComponents/ErrorMessage';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
}));

const DoneStep = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { response, ...practiceData } = useSelector(createPracticeSelector);
    const [isPending, setPending] = useState(false);
    const [errorResponse, setErrorResponse] = useState({
        status: '',
        data: {
            errorMessage: '',
        },
    });
    useEffect(() => {
        setPending(() => true);
        removeQuestionId(practiceData);
        dispatch(createPracticeAction(practiceData)).then((result) => {
            setPending(() => false);
            if (result.payload.status === FAILURE) {
                setErrorResponse((prev) => {
                    return { ...prev, ...result.payload };
                });
            } else {
                dispatch(clearState());
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={classes.root}>
            {isPending && <CircularProgress />}
            {!isPending && errorResponse.status !== FAILURE && (
                <Typography component='h6'>
                    <Check color='primary' />
                    Đã tạo bài tập thành công
                </Typography>
            )}
            {!isPending && errorResponse.status === FAILURE && (
                <ErrorMessage errorMessage={errorResponse?.data.errorMessage} />
            )}
        </div>
    );
};

export default DoneStep;
