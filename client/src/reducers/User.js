import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "User",
    initialState: {
        username: "",
        email: "",
        isAdmin: "",
        users: []
    },
    reducers: {
        addUser: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
            window.localStorage.setItem("user", action.payload.username);
            window.localStorage.setItem("isAdmin", action.payload.isAdmin)
        },
        addUsers: (state, action) => {
            state.users = action.payload.users;
        },
        removeUser: (state, action) => {
            state.username = "";
            state.email = "";
            state.users = [];
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("isAdmin");
        }
    }

})

export const { addUser, addUsers, removeUser } = userSlice.actions;
export default userSlice.reducer;