import mongoose from "mongoose";
import { User } from "./userModel.js";

const commentSchema = new mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        likesCount: Number,
    },
    { timestamp: true }
);

export const Comment =
    mongoose.models.comment ?? mongoose.model("Comment", commentSchema);
