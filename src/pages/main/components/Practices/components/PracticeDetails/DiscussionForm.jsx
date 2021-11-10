import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { socketSelector } from '../../../../../../redux/reducers/socketio.reducer';
import { commentSchema } from '../../../../../../validateSchemas';
import User from '../../../../commonComponents/User';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'flex-start',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    submitBtn: {
        marginTop: theme.spacing(1),
    },
}));

const DiscussionForm = ({ practiceId }) => {
    const classes = useStyles();
    const userProfile = JSON.parse(
        localStorage.getItem('userProfile') || 'null'
    );
    const { setValue, control, handleSubmit } = useForm({
        resolver: yupResolver(commentSchema),
    });

    const { socket } = useSelector(socketSelector);

    const handleComment = (data) => {
        socket.emit('DISCUSS_PRACTICE', {
            practiceId,
            discussContent: data.discussContent,
        });
        setValue('discussContent', '');
    };
    return (
        <div className={classes.root}>
            <User userProfile={userProfile} hideName={true} />
            <form
                onSubmit={handleSubmit(handleComment)}
                className={classes.form}
            >
                <Controller
                    name='discussContent'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.formField}
                            placeholder='Nhập bình luận của bạn'
                            variant='outlined'
                            rows={4}
                            multiline
                            fullWidth
                        />
                    )}
                />
                <Button
                    variant='outlined'
                    color='primary'
                    className={classes.submitBtn}
                    type='submit'
                >
                    Đăng
                </Button>
            </form>
        </div>
    );
};

export default DiscussionForm;
