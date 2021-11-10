import { axiosBase, handleError } from '../utils';

export const getAllNotifications = async () => {
    try {
        const response = await axiosBase({
            url: '/notification/getAllNotifications',
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

export const readAllNotifications = async () => {
    try {
        const response = await axiosBase({
            url: '/notification/readAllNotifications',
            method: 'put',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const deleteAllNotifications = async () => {
    try {
        const response = await axiosBase({
            url: '/notification/deleteAllNotifications',
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
