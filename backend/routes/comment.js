import { Post } from "../models/postModel.js";
import express from "express";
import { Comment } from "../models/commentModel.js";
import "dotenv/config";
import { User } from "../models/userModel.js";
import { auth } from "../middlewares/index.js";

const commentRoute = express.Router();

// delete comment
commentRoute.delete("/:postId/comment/:commentId", auth, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $pull: {
                    comments: req.params.commentId,
                },

                $inc: { commentsCount: -1 },
            },
            { new: true }
        );
        res.status(200).json({ message: "comment deleted" });
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
});

//add comment

commentRoute.post("/:postId/comment", auth, async (req, res) => {
    const postId = req.params.postId;
    console.log("postId from comment api :", postId);

    try {
        const newComment = await Comment.create({
            author: req.id,
            comment: req.body.text,
            likesCount: 0,
        });
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push: {
                    comments: newComment._id,
                },

                $inc: { commentsCount: 1 },
            },
            { new: true }
        );

        return res.status(201).json({ message: "comment added" });
    } catch (error) {
        console.log(error.message);
        return res.status(403).json({
            message: error.message,
        });
    }
});
//edit comment
commentRoute.patch("/comment/:commentId", auth, async (req, res) => {
    try {
        const newComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                comment: req.body.text,
            },
            { new: true }
        );
        return res.status(200).json({ message: "comment updated" });
    } catch (error) {
        console.log(error.message);
        return res.status(403).json({
            message: error.message,
        });
    }
});

// commentRoute.post("/:postId/comment",auth,async(req,res)=>{});
// commentRoute.post("/:postId/comment",auth,async(req,res)=>{});
// commentRoute.post("/:postId/comment",auth,async(req,res)=>{});
export default commentRoute;
