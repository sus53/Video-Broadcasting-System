import { createSlice } from "@reduxjs/toolkit";

const indexReducer = createSlice({
    name: "Index",
    initialState: {
        selectedSport: "",
        selectedVideo: {
            title: "",
            live: false
        }
    },
    reducers: {
        SelectSport: (state, action) => {
            state.selectedSport = action.payload.selectedSport
        },
        SelectVideo: (state, action) => {
            state.selectedVideo = action.payload.selectedVideo
        }
    }
})

export const { SelectSport, SelectVideo } = indexReducer.actions;

export default indexReducer.reducer