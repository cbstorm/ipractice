import {
    Avatar,
    CircularProgress,
    makeStyles,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../../../../apis';
import { FAILURE } from '../../../../../constant';
import { gradientBackground } from '../../../../../theme/gradientColor';
import ErrorMessage from '../../../commonComponents/ErrorMessage';
import Action from './Action';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(4),
        ...gradientBackground,
        borderRadius: 20,
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        marginRight: theme.spacing(4),
        width: 140,
        height: 140,
        fontSize: 60,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    name: {
        color: theme.palette.grey[200],
    },
}));

const UserInfo = () => {
    const classes = useStyles();
    const { _id } = JSON.parse(localStorage.getItem('userProfile') || 'null');
    const { userId } = useParams();
    const [pending, setPending] = useState(false);
    const [userProfile, setUserProfile] = useState();
    const [errorResponse, setErrorResponse] = useState();

    const getUserProfileHandler = async () => {
        setPending(true);
        const response = await getUserProfile(userId);
        if (response.data.status === FAILURE) {
            setErrorResponse((prev) => {
                return { ...prev, ...response.data };
            });
            return;
        }
        setUserProfile((prev) => {
            return { ...prev, ...response.data.data };
        });
        setPending(false);
    };
    useEffect(() => {
        getUserProfileHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar} src={userProfile?.avatarUrl}>
                {!userProfile?.avatarUrl && userProfile?.name[0].toUpperCase()}
            </Avatar>
            <div className={classes.textContainer}>
                <Typography
                    className={classes.name}
                    variant='h4'
                    component='span'
                >
                    {userProfile?.name}
                </Typography>
                <Typography
                    color='textPrimary'
                    variant='subtitle1'
                    component='span'
                >
                    {userProfile?.email}
                </Typography>
            </div>
            {_id !== userId && <Action userId={userId} />}
            {pending && <CircularProgress />}
            {errorResponse && (
                <ErrorMessage errorMessage={errorResponse?.data.errorMessage} />
            )}
        </div>
    );
};

export default UserInfo;
