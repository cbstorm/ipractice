import {
    Button,
    Card,
    CardActions,
    CardContent,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { PeopleOutline } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { getSubject } from '../../../../../utils';
import User from '../../../commonComponents/User';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
    admin: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: theme.spacing(2),
    },
    membersAmount: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
}));

const ClassItem = ({ _id, name, subject, joined, adminUser }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant='outlined'>
            <div className={classes.content}>
                <CardContent>
                    <Typography className={classes.title}>
                        {name.length < 20
                            ? name
                            : name.slice(0, 19).concat('...')}
                    </Typography>
                    <Typography className={classes.pos} color='textSecondary'>
                        {getSubject(subject)}
                    </Typography>
                    {adminUser && (
                        <div className={classes.admin}>
                            <User userProfile={adminUser} />
                        </div>
                    )}
                    <div className={classes.membersAmount}>
                        <PeopleOutline />
                        <Typography component='span' color='textSecondary'>
                            {joined.length} Thành viên
                        </Typography>
                    </div>
                </CardContent>
            </div>

            <CardActions>
                <Button
                    variant='outlined'
                    size='small'
                    component={Link}
                    to={`/main/classes/${_id}`}
                    fullWidth
                >
                    Xem
                </Button>
            </CardActions>
        </Card>
    );
};

export default ClassItem;
