import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import EmptyText from '../../../commonComponents/EmptyText';
import PendingSpinner from '../../../commonComponents/PendingSpinner';
import ClassItem from './ClassItem';

const useStyles = makeStyles((theme) => ({
    classList: {
        marginTop: theme.spacing(3),
    },
}));

const ClassList = ({ listClasses, title, pending, emptyText }) => {
    const classes = useStyles();
    return (
        <Container>
            <Typography variant='h5' component='h5'>
                {title}
            </Typography>
            {!listClasses?.length && <EmptyText text={emptyText} />}
            <Container className={classes.classList}>
                <Grid container spacing={4} className={classes.list}>
                    {listClasses?.length > 0 &&
                        listClasses.map((classItem) => {
                            return (
                                <Grid
                                    key={classItem._id}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <ClassItem {...classItem} />
                                </Grid>
                            );
                        })}
                </Grid>
            </Container>
            {pending && <PendingSpinner size={30} />}
        </Container>
    );
};

ClassList.propTypes = {
    listClasses: PropTypes.array,
    title: PropTypes.string.isRequired,
    pending: PropTypes.bool.isRequired,
    emptyText: PropTypes.string.isRequired,
};

export default ClassList;
