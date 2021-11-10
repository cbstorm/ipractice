import { axiosBase, handleError } from '../utils';
// Create new Practice
export const createPractice = async (practiceData) => {
    try {
        const response = await axiosBase({
            url: '/practice/create',
            method: 'post',
            data: practiceData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

// GET My Practice
export const getMyPractices = async (page, limit) => {
    try {
        const response = await axiosBase({
            url: `/practice/getmypractices?page=${page}&limit=${limit}`,
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

// GET Newest Practice List
export const getNewestPracticeList = async (page, limit) => {
    try {
        const response = await axiosBase({
            url: `/practice/getNewestPracticeList?page=${page}&limit=${limit}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

//Get Info Of One Practice
export const getSinglePractice = async (practiceId) => {
    try {
        const response = await axiosBase({
            url: `/practice/getSinglePractice/${practiceId}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

// Get Practice to do Practice
export const getPractice = async (practiceId) => {
    try {
        const response = await axiosBase({
            url: `/practice/getPractice/${practiceId}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

// Delete My Practice
export const deletePractice = async (practiceId) => {
    try {
        const response = await axiosBase({
            url: `/practice/${practiceId}`,
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

//GET Practice List of User
export const getUserPracticeList = async (userId, page, limit) => {
    try {
        const response = await axiosBase({
            url: `/practice/getUserPracticeList/${userId}?page=${page}&limit=${limit}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

//GET Practice List of Class
export const getClassPracticeList = async (classId, page, limit) => {
    try {
        const response = await axiosBase({
            url: `/practice/getClassPracticeList/${classId}?page=${page}&limit=${limit}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};
