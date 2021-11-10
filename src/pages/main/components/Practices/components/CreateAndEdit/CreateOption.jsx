import { Button, makeStyles, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    formField: {
        width: '100%',
        margin: '16px 0',
    },
    smallBtn: {
        height: 20,
        marginLeft: theme.spacing(1),
        fontSize: 10,
        color: theme.palette.error.main,
    },
    root: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const CreateOption = ({
    id,
    handleRemoveOption,
    handleOptionChange,
    saved,
}) => {
    const classes = useStyles();
    return (
        <div className={classes.root} id={id}>
            <TextField
                className={classes.formField}
                variant='outlined'
                label='Sự lựa chọn'
                onChange={(e) => handleOptionChange(e, id)}
                InputProps={{
                    readOnly: saved,
                }}
            />

            <Button
                className={classes.smallBtn}
                onClick={() => handleRemoveOption(id)}
            >
                Xóa
            </Button>
        </div>
    );
};

export default CreateOption;
