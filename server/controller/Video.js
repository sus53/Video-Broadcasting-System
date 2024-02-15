import Video from "../models/Video.js";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import fs from 'fs-extra'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const GetVideo = async (req, res) => {
    try {
        const video = await Video.find();
        res.status(200).json(video);
    } catch (error) {

    }
}

export const AddVideo = async (req, res) => {
    const video = req.body;

    try {
        const newVideo = new Video({ title: video.title, category: video.category });
        await newVideo.save();
        res.status(200).json(true);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}


export const UploadVideo = async (req, res) => {

    res.status(200).json(true);

};

export const RemoveVideo = async (req, res) => {
    const title = req.body.title;
    const Path = path.join(__dirname, '../../client/src/assets/video', title);
    try {
        //await fs.remove(Path);
        await Video.findOneAndDelete({ title });
        res.status(200).json(true);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}