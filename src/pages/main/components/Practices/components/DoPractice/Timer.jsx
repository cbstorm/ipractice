import { LinearProgress, Typography, withStyles } from '@material-ui/core';
import { AccessAlarm } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { memo, useEffect, useState } from 'react';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 20,
        borderRadius: 10,
    },
    colorPrimary: {
        backgroundColor:
            theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.main,
    },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

const Timer = ({ timeLimited, handleFinish }) => {
    const classes = useStyles();
    const [progress, setProgress] = useState(100);
    const [minute, setMinute] = useState(timeLimited - 1);
    const [second, setSecond] = useState(59);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecond((second) => {
                if (second === 0) {
                    setMinute((minute) => {
                        if (minute === 0 && second === 0) {
                            handleFinish(true);
                            setSecond(() => 0);
                            clearInterval(timer);
                            return 0;
                        }
                        return minute - 1;
                    });
                    return 59;
                }
                return second - 1;
            });
            setProgress((oldProgress) => {
                if (oldProgress <= 0) {
                    handleFinish(true);
                    clearInterval(timer);
                    return 0;
                }
                const diff = 100 / (timeLimited * 60);
                return oldProgress - diff;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={classes.root}>
            <BorderLinearProgress
                className={classes.timeline}
                variant='determinate'
                value={progress}
                color='secondary'
            />
            <Typography>
                <AccessAlarm />
                {minute > 9 ? minute : `0${minute}`}:
                {second > 9 ? second : `0${second}`}
            </Typography>
        </div>
    );
};

export default memo(Timer);
