import { IconButton, makeStyles, Typography } from '@material-ui/core';
import {
    AccessAlarm,
    EqualizerOutlined,
    HelpOutline,
    PlayArrow,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSinglePractice } from '../../../../../../apis/practice.apis';
import { FAILURE } from '../../../../../../constant';
import { practiceListSelector } from '../../../../../../redux/reducers/practiceList.reducer';
import { gradientBackground } from '../../../../../../theme';
import { getCategory, getLevel } from '../../../../../../utils';
import ErrorMessage from '../../../../commonComponents/ErrorMessage';
import User from '../../../../commonComponents/User';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: 500,
        marginBottom: theme.spacing(3),
    },
    info: {
        ...gradientBackground,
        width: '100%',
        overflow: 'hidden',
        padding: theme.spacing(4),
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        width: '33.3%',
        display: 'flex',
        justifyContent: 'center',
    },
    titleContainer: {
        width: '100%',
        [theme.breakpoints.down('md')]: {
            maxWidth: '50%',
        },
    },
    subTitle: {
        marginTop: theme.spacing(2),
        color: theme.palette.grey[200],
        fontWeight: 500,
        fontSize: 16,
        [theme.breakpoints.down('md')]: {
            fontSize: 14,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
        },
    },
    title: {
        fontWeight: 700,
        color: theme.palette.grey[100],
        fontSize: 22,
        [theme.breakpoints.down('md')]: {
            fontSize: 18,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
        },
    },
    playBtn: {
        backgroundColor: theme.palette.primary.light,
        width: 120,
        height: 120,
        border: '5px solid #2a348e',
        color: '#fff',
        transition: 'all ease-in .2s',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.grey[200],
            border: '5px solid #618cfb',
        },
    },
    subInfo: {
        minWidth: '50%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginTop: theme.spacing(2),
        borderRadius: 10,
        padding: theme.spacing(3),
        backgroundColor: theme.palette.success.light,
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    infoItem: {
        minWidth: 83,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.grey[100],
        padding: theme.spacing(2),
        borderRadius: 15,
    },
    questionList: {
        width: '100%',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    emptyDiv: {
        opacity: 0,
        visibility: 0,
    },
}));

const Info = ({ practiceId }) => {
    const classes = useStyles();
    const history = useHistory();
    const [practiceData, setPracticeData] = useState();
    const practiceList = useSelector(practiceListSelector);
    const [errorResponse, setErrorResponse] = useState();
    const [value, setValue] = React.useState(2);
    const getPracticeInfo = async () => {
        const response = await getSinglePractice(practiceId);
        if (response.data.status === FAILURE) {
            setErrorResponse((prev) => {
                return { ...prev, ...response.data };
            });
            return;
        }
        setPracticeData((prev) => {
            return { ...prev, ...response.data.data };
        });
    };
    const handlePlay = () => {
        history.push(`/main/practices/doPractice/${practiceData?._id}`);
    };

    useEffect(() => {
        if (!practiceList) {
            getPracticeInfo();
            return;
        }
        const availablePractice = practiceList.find(
            (practice) => practice._id === practiceId
        );
        if (!availablePractice) {
            getPracticeInfo();
            return;
        }
        setPracticeData((prev) => {
            return { ...prev, ...availablePractice };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [practiceId]);
    return (
        <div className={classes.root}>
            <div className={classes.info}>
                <div className={classes.item}>
                    <div className={classes.titleContainer}>
                        <User userProfile={practiceData?.creator} />
                        <Typography className={classes.subTitle}>
                            {getCategory(practiceData?.category)}
                        </Typography>
                        <Typography className={classes.title}>
                            {practiceData?.title}
                        </Typography>
                    </div>
                </div>
                <div className={classes.item}>
                    <IconButton
                        className={classes.playBtn}
                        onClick={handlePlay}
                        aria-label='play'
                    >
                        <PlayArrow />
                    </IconButton>
                </div>
                <div className={`${classes.item} ${classes.emptyDiv}`}>#</div>
                {/* <Box component='fieldset' borderColor='transparent'>
                    <Rating
                        name='simple-controlled'
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </Box> */}
            </div>
            <div className={classes.subInfo}>
                <div className={classes.infoItem}>
                    <HelpOutline color='secondary'>C??u h???i</HelpOutline>
                    <Typography variant='subtitle2'>
                        {practiceData?.questionsAmount ||
                            practiceData?.questionList.length}
                    </Typography>
                </div>
                <div className={classes.infoItem}>
                    <EqualizerOutlined color='primary'>
                        C???p ?????
                    </EqualizerOutlined>
                    <Typography variant='subtitle2'>
                        {getLevel(practiceData?.level)}
                    </Typography>
                </div>
                {practiceData?.limitTime && (
                    <div className={classes.infoItem}>
                        <AccessAlarm color='error'>Th???i gian</AccessAlarm>
                        <Typography variant='subtitle2'>{`${practiceData?.timeLimited} ph??t`}</Typography>
                    </div>
                )}
            </div>
            {errorResponse && <ErrorMessage />}
        </div>
    );
};

export default Info;
