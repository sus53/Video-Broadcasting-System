import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "Category",
    initialState: {
        category: []
    },
    reducers: {
        AddCategoryReducer: (state, action) => {
            state.category = action.payload.category;
        },
        RemoveCategoryReducer: (state, action) => {
            state.category = state.category.filter(category => category != action.payload.category);
        }
    }
})

export const { AddCategoryReducer, RemoveCategoryReducer } = categorySlice.actions;

export default categorySlice.reducer;