import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth.reducer';
import classDetailsReducer from '../reducers/classDetails.reducer';
import createPracticeReducer from '../reducers/createPractice.reducer';
import myClassListReducer from '../reducers/myClassList.reducer';
import practiceListReducer from '../reducers/practiceList.reducer';
import socketReducer from '../reducers/socketio.reducer';

export const store = configureStore({
    reducer: {
        authReducer,
        createPracticeReducer,
        practiceListReducer,
        myClassListReducer,
        classDetailsReducer,
        socketReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
