import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null,
    },
    reducers: {
        socketConnection: (state, action) => {
            state.socket = action.payload;
        },
    },
});

const socketReducer = socketSlice.reducer;

export const socketSelector = (state) => state.socketReducer;
export const { socketConnection } = socketSlice.actions;

export default socketReducer;
