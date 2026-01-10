import mongoose from "mongoose";
import { User } from "./userModel.js";
import { Comment } from "./commentModel.js";
const postSchema = new mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        avatar: String,
        image: String,
        caption: String,
        likesCount: Number,
        commentsCount: Number,
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

export const Post = mongoose.models.post ?? mongoose.model("Post", postSchema);
