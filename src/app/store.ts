import { configureStore } from "@reduxjs/toolkit";
import {userApi} from "@/app/features/apis/user.api";
import counterReducer from "@/app/features/slices/counter.slice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([userApi.middleware]),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
