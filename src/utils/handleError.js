import { FAILURE, SERVER_ERROR } from '../constant';

export const handleError = (error) => {
    if (!error.response) {
        const response = {
            data: {
                status: FAILURE,
                data: {
                    errorMessage: SERVER_ERROR,
                },
            },
        };
        return response;
    }
    return error.response;
};
