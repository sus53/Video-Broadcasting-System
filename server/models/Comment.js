import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    video: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    }

}, { timestamps: true })

const Comment = new mongoose.model("comments", commentSchema);

export default Comment;