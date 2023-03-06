import { configureStore } from "@reduxjs/toolkit";
import countryStateReducer from "./features/countryState/countryStateSlice";
import regionsReducer from "./features/regions/regionsSlice";
import hotSpotsReducer from "./features/hotSpots/hotSpotsSlice";

export const store = configureStore({
    reducer: {
        countryState: countryStateReducer,
        regions: regionsReducer,
        hotSpots: hotSpotsReducer
    }
})