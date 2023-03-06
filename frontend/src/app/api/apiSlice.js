import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.ebird.org/' }),
    tagTypes: ['Points', 'Regions', 'Checklists'],
    endpoints: builder => ({})
})