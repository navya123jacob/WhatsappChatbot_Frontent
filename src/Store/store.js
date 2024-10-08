import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './apiSlice';
import authSlice from './authSlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});
