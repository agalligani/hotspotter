import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    countryState: null
}

export const countryStateSlice = createSlice({
    name: 'selectedState',
    initialState,
    reducers: {
        assignCountryState: ( state, action ) => {
            state.countryState = action.payload
        },
        clearCountryState: ( state ) => {
            state.countryState = null
        }
    }
})

export default countryStateSlice.reducer

export const { assignCountryState, clearCountryState } = countryStateSlice.actions