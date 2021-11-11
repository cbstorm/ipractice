import {
    Button,
    CircularProgress,
    makeStyles,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateRecord } from '../../../../../../apis';
import { Education, Expired, Trophy, Try } from '../../../../../../assets';
import { FAILURE, wsEvent } from '../../../../../../constant';
import { socketSelector } from '../../../../../../redux/reducers/socketio.reducer';
import ErrorMessage from '../../../../commonComponents/ErrorMessage';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    congrat: {
        color: theme.palette.success.light,
    },
    img: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    result: {
        color: theme.palette.primary.dark,
        margin: '20px 0',
    },
}));

const Finish = ({ practiceId, questionCount, answerCorrectCount, expired }) => {
    const classes = useStyles();
    const history = useHistory();
    const [errorResponse, setErrorResponse] = useState();
    const [isPending, setPending] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const { socket } = useSelector(socketSelector);

    const updateRecordHandler = async () => {
        setPending(true);
        const response = await updateRecord(practiceId, {
            avgRatio: Math.floor((answerCorrectCount / questionCount) * 100),
        });
        if (response.data.status === FAILURE) {
            setErrorResponse((prev) => {
                return { ...prev, ...response.data.data };
            });
            return;
        }
        setSuccess(true);
        setPending(false);
    };
    const handleContinue = () => {
        history.push(`/main/practices/${practiceId}`);
    };

    useEffect(() => {
        if (practiceId) {
            updateRecordHandler();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit(wsEvent.DONE_PRACTICE, practiceId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.root}>
            {isPending && <CircularProgress />}
            {!expired && isSuccess && (
                <>
                    <Typography
                        variant='h4'
                        component='h6'
                        className={classes.congrat}
                    >
                        Chúc mừng bạn!
                    </Typography>
                    {questionCount === answerCorrectCount && (
                        <img className={classes.img} src={Trophy} alt='img' />
                    )}
                    {questionCount / 2 <= answerCorrectCount &&
                        answerCorrectCount < questionCount && (
                            <img
                                className={classes.img}
                                src={Education}
                                alt='img'
                            />
                        )}
                    {questionCount / 2 > answerCorrectCount && (
                        <img className={classes.img} src={Try} alt='img' />
                    )}
                    <Typography
                        variant='h5'
                        component='h6'
                        className={classes.result}
                    >
                        Tỉ lệ trả lời đúng của bạn là{' '}
                        {Math.floor((answerCorrectCount / questionCount) * 100)}{' '}
                        %
                    </Typography>
                </>
            )}
            {expired && isSuccess && (
                <>
                    <Typography
                        variant='h4'
                        component='h6'
                        className={classes.congrat}
                    >
                        Bạn đã hết thời gian
                    </Typography>
                    <img className={classes.img} src={Expired} alt='img' />

                    <Typography
                        variant='h5'
                        component='h6'
                        className={classes.result}
                    >
                        Bạn đã trả lời đúng {answerCorrectCount}/{questionCount}{' '}
                        câu hỏi!
                    </Typography>
                </>
            )}
            {errorResponse && <ErrorMessage />}
            <Button
                onClick={handleContinue}
                variant='contained'
                color='primary'
            >
                Tiếp tục
            </Button>
        </div>
    );
};

export default Finish;
