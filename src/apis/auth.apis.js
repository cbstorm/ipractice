import { axiosBase, handleError } from '../utils';

export const register = async (data) => {
    try {
        const response = await axiosBase({
            url: '/auth/register',
            method: 'post',
            data: data,
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const login = async (data) => {
    try {
        const response = await axiosBase({
            url: '/auth/login',
            method: 'post',
            data: data,
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const loginWithGoogle = async (token) => {
    try {
        const response = await axiosBase({
            url: '/auth/googleOauth',
            method: 'post',
            data: {
                googleToken: token,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const refreshToken = async (refresh_token) => {
    try {
        const response = await axiosBase({
            url: '/auth/refreshToken',
            method: 'post',
            data: { refreshToken: refresh_token },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await axiosBase({
            url: '/auth/forgotPassword',
            method: 'post',
            data: {
                email,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const verifyCode = async (email, verifyCode) => {
    try {
        const response = await axiosBase({
            url: `/auth/forgotPassword/verifyCode/${email}`,
            method: 'post',
            data: {
                verifyCode,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const resetPassword = async (email, password) => {
    try {
        const response = await axiosBase({
            url: `/auth/forgotPassword/resetPassword/${email}`,
            method: 'post',
            data: {
                password,
            },
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};
