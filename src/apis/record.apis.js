import { axiosBase, handleError } from '../utils';

// After Finished Practice will Call
export const updateRecord = async (practiceId, data) => {
    try {
        const response = await axiosBase({
            url: `/record/saveRecord/${practiceId}`,
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

export const getRecordList = async (practiceId, page, limit) => {
    try {
        const response = await axiosBase({
            url: `/record/getRecordList/${practiceId}?page=${page}&limit=${limit}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};
