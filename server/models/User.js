import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        require: false,
        unique: true
    },
    isAdmin: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = new mongoose.model("users", userSchema);

export default User;