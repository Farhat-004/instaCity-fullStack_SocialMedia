import express from "express";
import "dotenv/config";
import { User } from "../models/userModel.js";
import { auth } from "../middlewares/index.js";

const route = express.Router();
//get user profile
route.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.id).select({ posts: 0, token: 0 });
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: error.message });
    }
});
//update user info
route.patch("/me", auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.id,
            {
                name: req.body.name,
                bio: req.body.bio,
                website: req.body.website,
                gender: req.body.gender,
            },
            { new: true }
        ).select({
            posts: 0,
            token: 0,
            password: 0,
        });
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: error.message });
    }
});
//change or upload avatar
route.patch("/me/avatar", auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.id,
            {
                avatar: req.body.avatar,
            },
            { new: true }
        ).select({
            posts: 0,
            token: 0,
            password: 0,
        });
        return res
            .status(200)
            .json({ message: "Changed profile successfully" });
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: error.message });
    }
});
//change password
route.patch("/me/password", auth, async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.id, password: req.body.currentPassword },
            {
                password: req.body.newPassword,
            },
            { new: true }
        ).select({
            password: 0,
        });
        return res
            .status(200)
            .json({ message: "password changes successfully" });
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: error.message });
    }
});
//get user by id
route.get("/:userId", auth, async (req, res) => {
    if (!req.params.userId) {
        return res.status(401).json({ message: "userId is missing" });
    }
    try {
        const user = await User.findById(req.params.userId).lean();
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: "Failed to fetch user" });
    }
});

export default route;
