import { axiosBase, handleError } from '../utils';

export const search = async (query) => {
    try {
        const response = await axiosBase({
            url: `/search?q=${query}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};
