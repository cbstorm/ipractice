import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../../../../apis';
import { SUCCESS } from '../../../../../constant';
import User from '../../../commonComponents/User';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const MemberItem = ({ member }) => {
    const classes = useStyles();

    const [memberProfile, setMemberProfile] = useState();

    const getMemberProfile = async () => {
        const response = await getUserProfile(member.userId);
        if (response.data.status === SUCCESS) {
            setMemberProfile((prev) => {
                return { ...prev, ...response.data.data };
            });
        }
    };

    useEffect(() => {
        getMemberProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [member]);

    return (
        <div className={classes.root}>
            <User userProfile={memberProfile} />
        </div>
    );
};

MemberItem.propTypes = {
    member: PropTypes.any.isRequired,
};

export default MemberItem;
