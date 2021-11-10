import { axiosBase, handleError } from '../utils';

export const getUserProfile = async (userId) => {
    try {
        const response = await axiosBase({
            url: `/profile/getUserProfile/${userId}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const editAvatar = async (formData) => {
    try {
        const response = await axiosBase({
            url: `/profile/edit/avatar`,
            method: 'put',
            data: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const changeName = async (newName) => {
    try {
        const response = await axiosBase({
            url: `/profile/edit/changeName`,
            method: 'put',
            data: { name: newName },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const editPassword = async (data) => {
    try {
        const response = await axiosBase({
            url: `/profile/edit/password`,
            method: 'put',
            data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};
