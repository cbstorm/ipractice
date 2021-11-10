import { axiosBase, handleError } from '../utils';

// After Finished Practice will Call
export const createClass = async (data) => {
    try {
        const response = await axiosBase({
            url: `/class/create`,
            method: 'post',
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const getOneClass = async (classId) => {
    try {
        const response = await axiosBase({
            url: `/class/getOneClass/${classId}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const getAllMembers = async (classId) => {
    try {
        const response = await axiosBase({
            url: `/class/getAllMembers/${classId}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const getMyClassList = async () => {
    try {
        const response = await axiosBase({
            url: `/class/getClassesOfUser`,
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

export const getMemberAmount = async (classId) => {
    try {
        const response = await axiosBase({
            url: `/class/getMemberAmount/${classId}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const unInviteMember = async (classId, userId) => {
    try {
        const response = await axiosBase({
            url: `/class/unInviteMember/${classId}`,
            method: 'delete',
            data: {
                userId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const rejectJoinClass = async (classId) => {
    try {
        const response = await axiosBase({
            url: `/class/rejectJoinClass/${classId}`,
            method: 'delete',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const rejectRequestJoinClass = async (classId, joinRequestId) => {
    try {
        const response = await axiosBase({
            url: `/class/rejectRequestJoinClass/${classId}`,
            method: 'delete',
            data: {
                joinRequestId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const destroyRequestJoinClass = async (classId) => {
    try {
        const response = await axiosBase({
            url: `/class/destroyRequestJoinClass/${classId}`,
            method: 'delete',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const leaveClass = async (classId) => {
    try {
        const response = await axiosBase({
            url: `/class/leaveClass/${classId}`,
            method: 'delete',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const deleteMember = async (classId, joinedId) => {
    try {
        const response = await axiosBase({
            url: `/class/deleteMember/${classId}`,
            method: 'delete',
            data: {
                joinedId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const deleteClass = async (classId) => {
    try {
        const response = await axiosBase({
            url: `/class/deleteClass/${classId}`,
            method: 'delete',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};
