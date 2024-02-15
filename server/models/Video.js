import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    category: {
        type: String,
        require: true
    }
})

const Video = new mongoose.model("videos", videoSchema);

export default Video;