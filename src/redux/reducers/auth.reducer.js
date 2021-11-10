import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FAILURE, SUCCESS } from '../../constant';
import { login, loginWithGoogle, refreshToken, register } from './../../apis';

export const registerAction = createAsyncThunk(
    'auth/register',
    async (data) => {
        const response = await register(data);
        if (response.data.status === FAILURE) {
            return response.data;
        }
        if (response.data.status === SUCCESS) {
            const userProfile = response.data.data;
            const { token, refreshtoken } = response.headers;
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshtoken);
            return response.data;
        }
    }
);

export const loginAction = createAsyncThunk('auth/login', async (data) => {
    const response = await login(data);
    if (response.data.status === FAILURE) {
        return response.data;
    }
    if (response.data.status === SUCCESS) {
        const userProfile = response.data.data;
        const { token, refreshtoken } = response.headers;
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshtoken);
        return response.data;
    }
});

export const loginWithGoogleAction = createAsyncThunk(
    'auth/loginWithGoogle',
    async (token) => {
        const response = await loginWithGoogle(token);
        if (response.data.status === FAILURE) {
            return response.data;
        }
        if (response.data.status === SUCCESS) {
            const userProfile = response.data.data;
            const { token, refreshtoken } = response.headers;
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshtoken);
            return response.data;
        }
    }
);
export const refreshTokenAction = createAsyncThunk(
    'auth/refreshToken',
    async (refresh_token) => {
        const response = await refreshToken(refresh_token);
        if (response.data.status === FAILURE) {
            return response.data;
        }
        const { token, refreshtoken } = response.headers;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshtoken);
        return response.data;
    }
);

const initialState = {
    data: {
        name: '',
        email: '',
        _id: '',
        errorMessage: '',
    },
    isRefreshingToken: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerAction.fulfilled, (state, action) => {
                state.data = { ...state.data, ...action.payload.data };
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.data = { ...state.data, ...action.payload.data };
            })
            .addCase(loginWithGoogleAction.fulfilled, (state, action) => {
                state.data = { ...state.data, ...action.payload.data };
            })
            .addCase(refreshTokenAction.pending, (state) => {
                state.isRefreshingToken = true;
            })
            .addCase(refreshTokenAction.fulfilled, (state) => {
                state.isRefreshingToken = false;
            })
            .addCase(refreshTokenAction.rejected, (state) => {
                state.isRefreshingToken = false;
            });
    },
});

const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer;

export default authReducer;
