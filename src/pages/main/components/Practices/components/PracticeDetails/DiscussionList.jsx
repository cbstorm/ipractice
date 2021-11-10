import {
    CircularProgress,
    Container,
    makeStyles,
    Paper,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllDiscussionOfPractice } from '../../../../../../apis';
import { SUCCESS, wsEvent } from '../../../../../../constant';
import { socketSelector } from '../../../../../../redux/reducers/socketio.reducer';
import User from '../../../../commonComponents/User';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    discussItem: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: theme.spacing(2),
    },
    discussContent: {
        width: '100%',
        minHeight: 80,
        padding: theme.spacing(2),
    },
}));

const DiscussionList = ({ practiceId }) => {
    const classes = useStyles();
    const [pending, setPending] = useState(false);
    const [discussions, setDiscussions] = useState([]);
    const { socket } = useSelector(socketSelector);

    const getDiscussion = async () => {
        setPending(true);
        const response = await getAllDiscussionOfPractice(practiceId);
        if (response.data.status === SUCCESS) {
            setDiscussions((prev) => {
                return [...prev, ...response.data.data];
            });
            setPending(false);
            return;
        }
    };
    useEffect(() => {
        getDiscussion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [practiceId]);

    useEffect(() => {
        if (socket) {
            socket.on(`${wsEvent.NEW_DISCUSS} ${practiceId}`, (newDiscuss) => {
                setDiscussions((prev) => {
                    return [newDiscuss, ...prev];
                });
            });
        }
        return () => {
            if (socket) {
                socket.removeListener(`${wsEvent.NEW_DISCUSS} ${practiceId}`);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    return (
        <Container className={classes.root}>
            {pending && <CircularProgress />}
            {discussions.length > 0 &&
                discussions.map((discussItem) => {
                    return (
                        <div
                            key={discussItem._id}
                            className={classes.discussItem}
                        >
                            <User
                                userProfile={discussItem.creator}
                                hideName={true}
                            />
                            <Paper
                                className={classes.discussContent}
                                elevation={0}
                            >
                                {discussItem.content}
                            </Paper>
                        </div>
                    );
                })}
        </Container>
    );
};

export default DiscussionList;
