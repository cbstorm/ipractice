import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    deletePractice,
    getMyPractices,
    getNewestPracticeList,
} from '../../apis';
import { SUCCESS } from '../../constant';

//MY PRACTICE LIST
export const getMyPracticesListAction = createAsyncThunk(
    'getPracticeList',
    async (data) => {
        const response = await getMyPractices(data.page, data.limit);
        return response.data;
    }
);

export const loadmorePracticesAction = createAsyncThunk(
    'loadmorePractices',
    async (data) => {
        const response = await getMyPractices(data.page, data.limit);
        return response.data;
    }
);

// NEWEST PRACTICE LIST

export const getNewestPracticeListAction = createAsyncThunk(
    'getNewestPracticeList',
    async (data) => {
        const response = await getNewestPracticeList(data.page, data.limit);
        return response.data;
    }
);
export const loadmoreNewestPracticesAction = createAsyncThunk(
    'loadmoreNewestPractices',
    async (data) => {
        const response = await getNewestPracticeList(data.page, data.limit);
        return response.data;
    }
);

// DELETE MY PRACTICE
export const deleteMyPracticeAction = createAsyncThunk(
    'deletePractice',
    async (practiceId) => {
        const response = await deletePractice(practiceId);
        if (response.data.status === SUCCESS) {
            response.data.data = practiceId;
        }
        return response.data;
    }
);

const practiceListSlice = createSlice({
    name: 'practiceList',
    initialState: null,
    extraReducers: (builder) => {
        builder
            .addCase(getMyPracticesListAction.fulfilled, (state, action) => {
                return action.payload.data;
            })
            .addCase(loadmorePracticesAction.fulfilled, (state, action) => {
                const newState = [...state, ...action.payload.data];
                return newState;
            })
            .addCase(getNewestPracticeListAction.fulfilled, (state, action) => {
                return action.payload.data;
            })
            .addCase(
                loadmoreNewestPracticesAction.fulfilled,
                (state, action) => {
                    const newState = [...state, ...action.payload.data];
                    return newState;
                }
            )
            .addCase(deleteMyPracticeAction.fulfilled, (state, action) => {
                const newState = state.filter(
                    (practice) => practice._id !== action.payload.data
                );
                return newState;
            });
    },
});

const practiceListReducer = practiceListSlice.reducer;
export const practiceListSelector = (state) => state.practiceListReducer;

export default practiceListReducer;
