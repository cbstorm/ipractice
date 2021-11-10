import jwt_decode from 'jwt-decode';
export const decodeRefreshToken = (refresh_token, callback) => {
    try {
        const decoded = jwt_decode(refresh_token);
        if (!decoded || !decoded.exp) {
            throw new Error();
        }
        if (decoded.exp * 1000 - new Date().getTime() < 20000) {
            throw new Error();
        }
        return;
    } catch (error) {
        callback();
        return;
    }
};

export const decodeToken = (token, callback) => {
    try {
        const decoded = jwt_decode(token);
        if (!decoded || !decoded.exp) {
            throw new Error();
        }
        if (decoded.exp * 1000 - new Date().getTime() < 30000) {
            throw new Error();
        }
        return;
    } catch (error) {
        callback();
        return;
    }
};
