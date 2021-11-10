import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createClass, getMyClassList } from '../../apis';

export const createClassAction = createAsyncThunk(
    'createClass',
    async (classData) => {
        const response = await createClass(classData);
        return response.data;
    }
);

export const getMyClassListAction = createAsyncThunk(
    'getMyClassList',
    async () => {
        const response = await getMyClassList();
        return response.data;
    }
);

const myClassListSlice = createSlice({
    name: 'myPracticeList',
    initialState: null,
    extraReducers: (builder) => {
        builder
            .addCase(getMyClassListAction.fulfilled, (state, action) => {
                return action.payload.data;
            })
            .addCase(createClassAction.fulfilled, (state, action) => {
                const adminUser = JSON.parse(
                    localStorage.getItem('userProfile')
                );
                action.payload.data.adminUser = adminUser;
                if (!state) {
                    return [action.payload.data];
                }
                return [action.payload.data, ...state];
            });
    },
});

const myClassListReducer = myClassListSlice.reducer;
export const myClassListSelector = (state) => state.myClassListReducer;

export default myClassListReducer;
