import { createSlice } from "@reduxjs/toolkit";

const commentSlice = new createSlice({
    name: "Comment",
    initialState: {
        comment: []

    },
    reducers: {
        AddCommentReducer: (state, action) => {
            state.comment = action.payload.comment;
        }
    }


});


export const { AddCommentReducer } = commentSlice.actions;

export default commentSlice.reducer;