import axios from 'axios';
import { REST_API_URL } from '.';

export const axiosBase = axios.create({
    baseURL: REST_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});
