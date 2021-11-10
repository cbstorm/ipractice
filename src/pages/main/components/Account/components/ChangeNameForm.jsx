import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    InputAdornment,
    makeStyles,
    TextField,
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { changeName } from '../../../../../apis';
import { SUCCESS } from '../../../../../constant';
import { changeNameSchema } from '../../../../../validateSchemas';
import PendingSpinner from '../../../commonComponents/PendingSpinner';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        marginBottom: theme.spacing(3),
    },
}));

const ChangeNameForm = ({ onBack }) => {
    const classes = useStyles();
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(changeNameSchema),
    });
    const [pending, setPending] = useState(false);

    const onSubmit = async (data) => {
        setPending(true);
        const response = await changeName(data.name);
        if (response.data.status === SUCCESS) {
            const newUserProfile = { ...userProfile, name: data.name };
            localStorage.setItem('userProfile', JSON.stringify(newUserProfile));
            setPending(false);
            onBack();
        }
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name='name'
                control={control}
                defaultValue={userProfile.name}
                render={({ field }) => (
                    <>
                        <TextField
                            {...field}
                            className={classes.textField}
                            label='Tên'
                            variant='outlined'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <Person />
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                        />
                    </>
                )}
            />

            <Button type='submit' variant='contained' color='primary'>
                Thay đổi
            </Button>
            {pending && <PendingSpinner size={30} />}
        </form>
    );
};

ChangeNameForm.propTypes = {
    onBack: PropTypes.func.isRequired,
};

export default ChangeNameForm;
