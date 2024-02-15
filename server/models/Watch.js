import mongoose from "mongoose";

const watchSchema = new mongoose.Schema({
    list: {
        type: Array,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }

})

const Watch = mongoose.model("watches", watchSchema)

export default Watch;
