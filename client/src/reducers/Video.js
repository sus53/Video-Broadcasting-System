import { createSlice } from "@reduxjs/toolkit";

const videoReducer = createSlice({
    name: "Video",
    initialState: {
        video: []

    },
    reducers: {
        AddVideoReducer: (state, action) => {
            state.video = action.payload.video;
        },
        RemoveVideoReducer: (state, action) => {
            state.video = "";
        }
    }
})

export const { AddVideoReducer, RemoveVideoReducer } = videoReducer.actions;

export default videoReducer.reducer