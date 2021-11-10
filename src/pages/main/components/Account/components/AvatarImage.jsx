import { Avatar, makeStyles } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import Compressor from 'compressorjs';
import React, { useState } from 'react';
import { editAvatar } from '../../../../../apis';
import { FAILURE, SUCCESS } from '../../../../../constant';
import ErrorMessage from '../../../commonComponents/ErrorMessage';
import PendingSpinner from '../../../commonComponents/PendingSpinner';

const useStyles = makeStyles((theme) => ({
    avatarImg: {
        backgroundColor: theme.palette.primary.light,
        marginRight: theme.spacing(4),
        width: 140,
        height: 140,
        fontSize: 60,
    },
    avatar: {
        marginTop: theme.spacing(3),
        position: 'relative',
    },
    input: {
        display: 'none',
    },
    inputLabel: {
        backgroundColor: '#000',
        color: '#fff',
        padding: 3,
        borderRadius: 5,
        cursor: 'pointer',
        position: 'absolute',
        bottom: 10,
        right: 30,
        transition: 'all ease-in 0.2s',
        '&:hover': {
            backgroundColor: '#333',
        },
    },
    editIcon: {
        fontSize: 14,
    },
}));

const AvatarImage = () => {
    const classes = useStyles();
    const { avatarUrl, name } = JSON.parse(localStorage.getItem('userProfile'));
    const [pending, setPending] = useState(false);
    const [avatarUrlState, setAvatarUrlState] = useState(avatarUrl);
    const [errorResponse, setErrorResponse] = useState();

    const handleEditAvatar = (e) => {
        setPending(true);
        const image = e.target.files[0];
        new Compressor(image, {
            maxWidth: 160,
            maxHeight: 160,
            success: async (result) => {
                const formData = new FormData();
                formData.append('image', result);
                const response = await editAvatar(formData);
                if (response.data.status === SUCCESS) {
                    setAvatarUrlState(response.data.data);
                    const userProfile = JSON.parse(
                        localStorage.getItem('userProfile')
                    );
                    const newUserProfile = {
                        ...userProfile,
                        avatarUrl: response.data.data,
                    };
                    localStorage.setItem(
                        'userProfile',
                        JSON.stringify(newUserProfile)
                    );
                }
                if (response.data.status === FAILURE) {
                    setErrorResponse(() => ({ ...response.data.data }));
                }
                setPending(false);
            },
        });
    };

    return (
        <div className={classes.avatar}>
            <Avatar className={classes.avatarImg} src={avatarUrlState}>
                {!avatarUrlState && name[0].toUpperCase()}
            </Avatar>
            <input
                className={classes.input}
                type='file'
                id='file'
                accept='image/*'
                onChange={handleEditAvatar}
            />
            <label className={classes.inputLabel} htmlFor='file'>
                <Edit className={classes.editIcon} />
                Edit
            </label>
            {pending && <PendingSpinner size={30} />}
            {errorResponse && (
                <ErrorMessage errorMessage={errorResponse.errorMessage} />
            )}
        </div>
    );
};

export default AvatarImage;
