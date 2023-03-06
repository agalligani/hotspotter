import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    regions: null
}

export const regionsSlice = createSlice({
    name: 'selectedRegion',
    initialState,
    reducers: {
        assignRegion: ( state, action ) => {
            state.regions = action.payload
        },
        clearRegion: ( state ) => {
            state.regions = null
        }
    }
})

export default regionsSlice.reducer

export const { assignRegion, clearRegion } = regionsSlice.actions