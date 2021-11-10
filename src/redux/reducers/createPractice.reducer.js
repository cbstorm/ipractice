import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPractice } from '../../apis';
import { FAILURE } from '../../constant';

export const createPracticeAction = createAsyncThunk(
    'practice/create',
    async (practiceData, { rejectWithValue }) => {
        const response = await createPractice(practiceData);
        if (response.data.status === FAILURE) {
            return rejectWithValue(response.data);
        }
        return response.data;
    }
);

const initialState = {
    title: '',
    category: 'other',
    level: 'easy',
    limitTime: false,
    timeLimited: 0,
    sharing: 'PUBLIC',
    questionList: [],
    response: {
        status: '',
        errorMessage: '',
    },
};

const createPracticeSlice = createSlice({
    name: 'createPractice',
    initialState,
    reducers: {
        createHeader: (state, action) => {
            return { ...state, ...action.payload };
        },
        saveQuestion: (state, action) => {
            state.questionList = [...state.questionList, action.payload];
        },
        removeQuestionInStore: (state, action) => {
            state.questionList = state.questionList.filter(
                (question) => question.id !== action.payload
            );
        },
        clearState: (state) => {
            return {
                ...state,
                title: '',
                category: 'other',
                level: 'easy',
                limitTime: false,
                timeLimited: 0,
                sharing: 'PUBLIC',
                classId: undefined,
                questionList: [],
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPracticeAction.fulfilled, (state, action) => {
                state.response.status = action.payload.status;
            })
            .addCase(createPracticeAction.rejected, (state, action) => {
                state.response.status = action.payload.status;
                state.response.errorMessage = action.payload.data.errorMessage;
            });
    },
});

const createPracticeReducer = createPracticeSlice.reducer;
export const { createHeader, saveQuestion, removeQuestionInStore, clearState } =
    createPracticeSlice.actions;
export const createPracticeSelector = (state) => state.createPracticeReducer;
export default createPracticeReducer;
