import Comment from "../models/Comment.js";

export const GetComment = async (req, res) => {
    try {
        const comment = await Comment.find();
        res.status(200).json(comment);
    } catch (error) {

    }
}

export const AddComment = async (req, res) => {
    const comment = req.body;
    try {
        const newWatch = new Comment({ comment: comment.comment, username: comment.username, video: comment.video });
        await newWatch.save();
        res.status(202).json(comment);
    } catch (error) {
        res.status(402).json({ "message": error.message })
    }
}

export const EditComment = async (req, res) => {
    const comment = req.body;
    try {
        await Comment.findOneAndUpdate({ video: comment.video }, { comment: comment.comment, username: comment.username, video: comment.video });
        res.status(200).json(true);
    } catch (error) {
        res.status(401).json(error);
    }
}

export const DeleteComment = async (req, res) => {
    const comment = req.body.comment;
    try {
        await Comment.findOneAndDelete({ comment });
        res.status(200).json(true);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

