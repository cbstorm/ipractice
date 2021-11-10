import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CancelPresentation } from '@material-ui/icons';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { categories, classSharings } from '../../../../../assets';
import { SUCCESS } from '../../../../../constant';
import { createClassAction } from '../../../../../redux/reducers/myClassList.reducer';
import { createClassSchema } from '../../../../../validateSchemas/createClassSchema';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    closeBtn: {
        marginLeft: 'auto',
    },
    dialogContent: {
        width: 500,
        paddingInline: 100,
        paddingBottom: 30,
        paddingTop: 30,
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            paddingInline: 50,
            paddingBottom: 50,
            paddingTop: 50,
        },
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formField: {
        marginBottom: theme.spacing(3),
        width: '100%',
    },
}));

const CreateDialog = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const {
        setValue,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createClassSchema),
    });
    const dispatch = useDispatch();
    const { open, onClose } = props;
    const [isPending, setPending] = useState(false);

    const createClassHandler = (data) => {
        setPending(true);
        dispatch(createClassAction(data)).then((result) => {
            if (result.payload.status === SUCCESS) {
                onClose();
                setPending(false);
                setValue('name', '');
                setValue('subject', categories[0].value);
                setValue('sharing', classSharings[0].value);
            }
        });
    };

    return (
        <Dialog open={open} className={classes.root} fullScreen={fullScreen}>
            <IconButton onClick={onClose} className={classes.closeBtn}>
                <CancelPresentation color='error' />
            </IconButton>
            <DialogTitle>Tạo lớp học mới</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(createClassHandler)}
                >
                    <Controller
                        name='name'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='Tên lớp học'
                                className={classes.formField}
                                placeholder='Nhập tên lớp học'
                                variant='outlined'
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name='subject'
                        control={control}
                        defaultValue={categories[0].value}
                        render={({ field }) => (
                            <FormControl
                                variant='outlined'
                                className={classes.formField}
                            >
                                <InputLabel id='subject-label'>
                                    Môn học
                                </InputLabel>
                                <Select
                                    {...field}
                                    labelId='subject-label'
                                    label='Môn học'
                                    error={!!errors.category}
                                    className={classes.formField}
                                >
                                    {categories.map((category) => {
                                        return (
                                            <MenuItem
                                                key={category.value}
                                                value={category.value}
                                            >
                                                {category.vnm}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name='sharing'
                        control={control}
                        defaultValue={classSharings[0].value}
                        render={({ field }) => (
                            <FormControl
                                variant='outlined'
                                className={classes.formField}
                            >
                                <InputLabel id='sharing-label'>
                                    Chế độ
                                </InputLabel>
                                <Select
                                    {...field}
                                    labelId='sharing-label'
                                    label='Chế độ'
                                >
                                    {classSharings.map((item) => {
                                        return (
                                            <MenuItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.vmn}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Button type='submit' color='primary' variant='contained'>
                        {isPending && <CircularProgress color='secondary' />}
                        Khởi tạo
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateDialog;
