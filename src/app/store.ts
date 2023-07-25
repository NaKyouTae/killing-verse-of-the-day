import {configureStore, EnhancedStore, Store} from "@reduxjs/toolkit";
import {verseReducer} from "@/app/features/slices/verse.slice";
import {verseApi} from "@/app/features/apis/verse.api";

export const store = configureStore({
    reducer: {
        verse: verseReducer,
        [verseApi.reducerPath]: verseApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => {
        return [
            ...getDefaultMiddleware({ serializableCheck: false }),
            verseApi.middleware
        ]
    }
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

