import { axiosBase, handleError } from '../utils';

export const getAllDiscussionOfPractice = async (practiceId) => {
    try {
        const response = axiosBase(
            `/discussion/getAllDiscussionOfPractice/${practiceId}`
        );
        return response;
    } catch (error) {
        return handleError(error);
    }
};
