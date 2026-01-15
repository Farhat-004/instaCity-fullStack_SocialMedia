import mongoose from "mongoose";
import { Post } from "./postModel.js";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bio: String,
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    avatar: String,
    postCount: Number,
    website: String,
    bio: String,
    gender: String,
    address: String,
    mobileNumber: Number,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    notifications: [
        {
            type: String,
            postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        },
    ],
    friends: [
        {
            roomId: String,
            friend: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
    ],
    token: {
        accessToken: String,
        refreshToken: String,
    },
});

export const User = mongoose.models.user ?? mongoose.model("User", userSchema);
