import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const hotSpotsSlice = createSlice({
    name: 'hotSpots',
    initialState,
    reducers: {
        addHotSpots(state, action) {
            console.log(action.payload)
            state.push(action.payload)
        },
        clearHotSpots( state ) {
            state.length = 0
        }
    }

})

export default hotSpotsSlice.reducer

export const { addHotSpots, clearHotSpots } = hotSpotsSlice.actions