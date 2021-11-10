import {
    Button,
    Container,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { ArrowDropDownCircleOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import PendingSpinner from './PendingSpinner';
import PracticeItem from './PracticeItem';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heading: {
        width: '100%',
        textAlign: 'left',
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    showMoreBtn: {
        width: '50%',
        margin: '10px auto',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
}));

const PracticeList = ({
    title,
    practiceList,
    pending,
    exhausted,
    onLoadmore,
    errorResponse,
    isInClass,
}) => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Typography className={classes.heading} variant='h5' component='h6'>
                {title}
            </Typography>
            {practiceList?.length > 0 && (
                <Grid container spacing={6} className={classes.list}>
                    {practiceList.map((practice) => {
                        return (
                            <Grid
                                key={practice._id}
                                item
                                xs={12}
                                sm={isInClass ? 12 : 6}
                                md={isInClass ? 6 : 4}
                            >
                                <PracticeItem {...practice} />
                            </Grid>
                        );
                    })}
                </Grid>
            )}
            {pending && <PendingSpinner size={30} />}
            {onLoadmore && !exhausted && practiceList?.length > 0 && (
                <Button
                    className={classes.showMoreBtn}
                    color='primary'
                    variant='contained'
                    onClick={onLoadmore}
                    startIcon={<ArrowDropDownCircleOutlined />}
                >
                    Tải thêm...
                </Button>
            )}
            {errorResponse && <ErrorMessage />}
        </Container>
    );
};

PracticeList.propTypes = {
    title: PropTypes.string.isRequired,
    practiceList: PropTypes.array,
    pending: PropTypes.bool,
    exhausted: PropTypes.bool,
    onLoadmore: PropTypes.func,
    errorResponse: PropTypes.any,
    isInClass: PropTypes.bool,
};

export default PracticeList;
