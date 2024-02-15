import express from "express";
import { AddWatch, GetWatch, RemoveWatch } from "../controller/Watch.js";

const router = express.Router();

router.post('/', GetWatch);
router.post('/add', AddWatch);
router.delete('/delete/:id', RemoveWatch);
export default router;