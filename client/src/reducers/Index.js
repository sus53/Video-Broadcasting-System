import { createSlice } from "@reduxjs/toolkit";

const indexReducer = createSlice({
    name: "Index",
    initialState: {
        selectedSport: "",
        selectedVideo: {
            title: "",
            live: false
        },
        response: ""
    },
    reducers: {
        SelectSport: (state, action) => {
            state.selectedSport = action.payload.selectedSport
        },
        SelectVideo: (state, action) => {
            state.selectedVideo = action.payload.selectedVideo
        },
        AddResponse: (state, action) => {
            state.response = action.payload.response
        }
    }
})

export const { SelectSport, SelectVideo, AddResponse } = indexReducer.actions;

export default indexReducer.reducer