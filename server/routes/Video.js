import express from "express";
import multer from "multer";
import path, { dirname } from "path";
import { AddVideo, GetVideo, RemoveVideo, UploadVideo } from "../controller/Video.js";
import { fileURLToPath } from 'url';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../../client/src/assets/video');
        cb(null, destinationPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })


router.get('/', GetVideo);
router.post('/add', AddVideo);
router.post('/upload', upload.single('video'), UploadVideo)
router.post('/remove', RemoveVideo);

export default router;
