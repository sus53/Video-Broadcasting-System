import express from "express";
import { AddCategory, GetCategory, RemoveCategory, UpdateCategory, UploadCategory } from "../controller/Category.js";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../../client/src/assets/img/sport');
        cb(null, destinationPath)
    },
    filename: function (req, file, cb) {
        const category = req.body.category;
        console.log(category)
        console.log("hello")
        const fileName = category + ".jpeg";
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })
const router = express.Router();

router.get('/', GetCategory);
router.post('/add', AddCategory);
router.post('/upload', upload.single('image'), UploadCategory);
router.post('/update', UpdateCategory);
router.post('/remove', RemoveCategory);

export default router;