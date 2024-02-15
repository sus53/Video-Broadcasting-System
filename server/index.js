import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRouter from './routes/User.js'
import WatchRouter from './routes/Watch.js'
import CategoryRouter from './routes/Category.js';
import VideoRouter from './routes/Video.js';
import CommentRouter from './routes/Comment.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = "4000";

mongoose.connect(process.env.mongodb).then(() => {
    console.log("app is listening in port " + port);
    app.listen(port);
}).catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(cors());
app.use('/user', UserRouter);
app.use('/watch', WatchRouter);
app.use('/category', CategoryRouter);
app.use('/video', VideoRouter);
app.use('/comment', CommentRouter);

