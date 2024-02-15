import express from "express";
import { AddComment, GetComment, DeleteComment } from "../controller/Comment.js";

const router = express.Router();

router.get('/', GetComment)
router.post('/add', AddComment);
router.delete('/delete/', DeleteComment);
export default router;
