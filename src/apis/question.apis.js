import { axiosBase, handleError } from '../utils';

export const getQuestionList = async (practiceId) => {
    try {
        const response = await axiosBase({
            url: `/question/getQuestionList/${practiceId}`,
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
