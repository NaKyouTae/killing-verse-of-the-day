import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Verse} from "@/app/lib/types/interfaces";
import {RootState} from "@/app/store";

const initialState = {
    id: '',
    verse: '',
    writer: '',
    like: 0,
    createdAt: 0,
    updatedAt: 0,
} as Verse;

export const slice = createSlice({
    name: "verse",
    initialState,
    reducers: {
        setVerse: (state, action: PayloadAction<string>) => {
            state.verse = action.payload
        },
        increment: (state) => {
            state.like += 1;
        },
        decrement: (state) => {
            state.like -= 1;
        },
    },
});

const state = (state: RootState): Verse => state.verse

// action creator
export const verseActions = slice.actions

// selector
export const selectorLikeOfVerse = createSelector(state, state => state.like)
export const selectVerse = createSelector(state, state => state.verse)

export const verseReducer = slice.reducer
