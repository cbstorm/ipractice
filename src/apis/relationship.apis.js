import { axiosBase, handleError } from '../utils';

export const getAllFriends = async () => {
    try {
        const response = await axiosBase({
            url: '/relationship/getAllFriends',
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const checkRelationshipStatus = async (userId) => {
    try {
        const response = await axiosBase({
            url: `/relationship/checkRelationshipStatus/${userId}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const rejectInviteFriend = async (relationshipId) => {
    try {
        const response = await axiosBase({
            url: `/relationship/rejectInviteFriend/${relationshipId}`,
            method: 'delete',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};
