import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Verse} from "@/app/lib/types/interfaces"
import {RootState} from "@/app/store"

interface InitialInterfaceState {
    verses: Verse[],
}

const initialState = (): InitialInterfaceState => {
    return {
        verses: [
            {
                id: '',
                verse: '',
                writer: '',
                like: 0,
                createdAt: 0,
                updatedAt: 0,
            },
        ],
    }
}

export const slice = createSlice({
    name: "verse",
    initialState,
    reducers: {
        addVerse: (state, action: PayloadAction<Verse>) => {
            state.verses.push(action.payload)
        },
        changeResponse: (state, action: PayloadAction<Verse[]>) => {
            state.verses = action.payload
        },
    },
})

const state = (state: RootState): InitialInterfaceState => state.verseList

// action creator
export const verseListActions = slice.actions

// selector
export const selectVerses = createSelector(state, state => state.verses)

export const verseListReducer = slice.reducer
