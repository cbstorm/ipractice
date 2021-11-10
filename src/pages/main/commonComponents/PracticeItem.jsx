import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PlayArrow } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { getCategory, getImg, getLevel } from '../../../utils';
import PracticeMenu from './PracticeMenu';
import User from './User';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 300,
        borderRadius: 25,
        boxShadow: '0px 5px 10px #999',
        position: 'relative',
        '&:hover': {
            boxShadow: '0px 5px 20px #888',
        },
    },
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    head: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    subTitle: {
        color: theme.palette.grey[200],
        fontWeight: 500,
        textShadow: '1px 1px 10px #555',
        cursor: 'pointer',
    },
    title: {
        fontWeight: 700,
        textShadow: '1px 1px 10px #555',
        color: '#fff',
        fontSize: 22,
        cursor: 'pointer',
    },
    img: {
        width: '100%',
        height: '75%',
        boxShadow: '1px 1px 5px #999',
        filter: 'brightness(60%) contrast(140%)',
        transition: 'all ease-in 0.2s',
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(40%) contrast(150%)',
        },
    },
    info: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    playBtn: {
        backgroundColor: theme.palette.primary.light,
        boxShadow: '0px 0px 10px #999',
        color: '#fff',
        transition: 'all ease-in .2s',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.grey[200],
        },
    },
}));

const PracticeItem = ({
    _id,
    title,
    category,
    questionsAmount,
    level,
    limitTime,
    timeLimited,
    creator,
}) => {
    const classes = useStyles();
    const history = useHistory();
    const userProfile = JSON.parse(
        localStorage.getItem('userProfile') || 'null'
    );
    const handleClick = () => {
        history.push(`/main/practices/${_id}`);
    };
    const handlePlay = () => {
        history.push(`/main/practices/doPractice/${_id}`);
    };
    return (
        <>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.img}
                    image={getImg(category)}
                    title={getCategory(category)}
                    onClick={handleClick}
                />

                <CardContent className={classes.content}>
                    <div className={classes.head}>
                        <User userProfile={creator} nameColor='#e5e5e5' />
                        {/* PRACTICE MENU */}
                        {creator?._id === userProfile?._id && (
                            <PracticeMenu practiceId={_id} />
                        )}
                    </div>
                    <div>
                        <Typography component='h6' className={classes.subTitle}>
                            {getCategory(category)}
                        </Typography>
                        <Typography
                            onClick={handleClick}
                            component='h6'
                            className={classes.title}
                        >
                            {title.length < 20
                                ? title
                                : title.slice(0, 19).concat('...')}
                        </Typography>
                    </div>
                </CardContent>

                <div className={classes.info}>
                    <div className={classes.infoItem}>
                        <Typography variant='subtitle1'>Câu hỏi</Typography>
                        <Typography variant='subtitle2'>
                            {questionsAmount}
                        </Typography>
                    </div>
                    <div className={classes.infoItem}>
                        <Typography variant='subtitle1'>Cấp độ</Typography>
                        <Typography variant='subtitle2'>
                            {getLevel(level)}
                        </Typography>
                    </div>
                    {limitTime && (
                        <div className={classes.infoItem}>
                            <Typography variant='subtitle1'>
                                Thời gian
                            </Typography>
                            <Typography variant='subtitle2'>{`${timeLimited} phút`}</Typography>
                        </div>
                    )}
                    <IconButton
                        className={classes.playBtn}
                        onClick={handlePlay}
                        aria-label='play'
                    >
                        <PlayArrow />
                    </IconButton>
                </div>
            </Card>
        </>
    );
};

export default PracticeItem;
