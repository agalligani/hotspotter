import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    baseNode: "US",
    countryState: null
}

export const countryStateSlice = createSlice({
    name: 'selectedState',
    initialState,
    reducers: {
        assignBaseNode: ( state, action ) => {
            state.baseNode = action.payload;
            state.countryState = null
        },
        assignCountryState: ( state, action ) => {
            state.countryState = action.payload
        },
        clearCountryState: ( state ) => {
            state.countryState = null
        }
    }
})

export default countryStateSlice.reducer

export const { assignBaseNode, assignCountryState, clearCountryState } = countryStateSlice.actions

