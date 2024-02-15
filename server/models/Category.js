import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
});

const Category = new mongoose.model('categories', CategorySchema);

export default Category;
