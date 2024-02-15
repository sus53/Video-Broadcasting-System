import Category from "../models/Category.js";
import fs from 'fs';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const GetCategory = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

export const AddCategory = async (req, res) => {
    const category = req.body.category;
    try {
        const newCategory = new Category({ category });
        await newCategory.save();
        res.status(200).json(newCategory);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

export const RemoveCategory = async (req, res) => {
    const category = req.body.category;
    try {
        const imagePath = path.join(__dirname, `../../client/src/assets/img/sport/${category}.jpeg`);
        await Category.findOneAndDelete({ category });
        res.status(200).json(true);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}
export const UploadCategory = async (req, res) => {
    res.status(200).json(req.body.category);
}

export const UpdateCategory = async (req, res) => {
    const category = req.body;
    try {
        await Category.findOneAndUpdate({ category: category.category }, { category: category.category, image: category.image });
        res.status(200).json(true);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}