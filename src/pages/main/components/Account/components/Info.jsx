import { makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import ChangeNameForm from './ChangeNameForm';
import ChangePasswordForm from './ChangePasswordForm';

const useStyles = makeStyles((theme) => ({
    underline: {
        width: '100%',
        height: 1,
        backgroundColor: '#afc3ce',
        marginTop: theme.spacing(3),
    },

    info: {
        marginTop: theme.spacing(3),
    },
    infoItem: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: 500,
    },
    infoTitle: {
        fontWeight: 500,
        color: '#888',
        display: 'inline-block',
    },
    infoContent: {
        display: 'flex',
        alignItems: 'center',
    },
    editBtn: {
        marginLeft: theme.spacing(3),
        color: '#618cfb',
        cursor: 'pointer',
        '&:hover': {
            color: '#90cdfc',
        },
    },
}));

const Info = () => {
    const classes = useStyles();
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const [openChangeNameForm, setOpenChangeNameForm] = useState(false);
    const [openChangePasswordForm, setOpenChangePasswordForm] = useState(false);

    const handleBack = () => {
        setOpenChangeNameForm(false);
        setOpenChangePasswordForm(false);
    };

    return (
        <div className={classes.info}>
            {!openChangeNameForm && (
                <div className={classes.infoItem}>
                    <Typography className={classes.infoTitle} component='span'>
                        Tên
                    </Typography>
                    <div className={classes.infoContent}>
                        <Typography
                            variant='h6'
                            color='textPrimary'
                            component='span'
                        >
                            {userProfile?.name}
                        </Typography>
                        <Typography
                            onClick={() => setOpenChangeNameForm(true)}
                            className={classes.editBtn}
                            component='span'
                        >
                            sửa
                        </Typography>
                    </div>
                </div>
            )}
            {openChangeNameForm && <ChangeNameForm onBack={handleBack} />}

            <div className={classes.underline}></div>

            <div className={classes.infoItem}>
                <Typography className={classes.infoTitle} component='span'>
                    Email
                </Typography>
                <div className={classes.infoContent}>
                    <Typography
                        variant='h6'
                        color='textPrimary'
                        component='span'
                    >
                        {userProfile?.email}
                    </Typography>
                </div>
            </div>
            <div className={classes.underline}></div>

            {userProfile.loginMethod === 'local' && !openChangePasswordForm && (
                <div className={classes.infoItem}>
                    <Typography className={classes.infoTitle} component='span'>
                        Mật khẩu
                    </Typography>
                    <div className={classes.infoContent}>
                        <Typography
                            variant='h6'
                            color='textPrimary'
                            component='span'
                        >
                            ***********
                        </Typography>
                        <Typography
                            onClick={() => setOpenChangePasswordForm(true)}
                            className={classes.editBtn}
                            component='span'
                        >
                            đổi mật khẩu
                        </Typography>
                    </div>
                </div>
            )}
            {openChangePasswordForm && (
                <ChangePasswordForm onBack={handleBack} />
            )}
        </div>
    );
};

export default Info;
