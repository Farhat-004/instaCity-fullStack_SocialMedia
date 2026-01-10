import { Post } from "../models/postModel.js";
import express from "express";
import "dotenv/config";
import { User } from "../models/userModel.js";
import { auth } from "../middlewares/index.js";
// import multer from "multer";

// const upload = multer({ storage: multer.memoryStorage() });
const postRoute = express.Router();
//create new post
postRoute.post("/", auth, async (req, res) => {
    const user = await User.findById(req.id).select({ token: 0 });
    console.log("caption:", req.body.caption);

    try {
        const newPost = await Post.create({
            name: user.name,
            avatar: user.avatar,
            author: req.id,
            caption: req.body.caption,
            image: req.body.image,
            likesCount: 0,
            commentsCount: 0,
        });
        const updatedUser = await User.findByIdAndUpdate(
            req.id,
            {
                $push: { posts: newPost._id },
            },
            { new: true }
        );
        res.status(201).json({
            post: newPost,
            user: updatedUser,
        });
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
});

//toggle like
postRoute.post("/:postId/like", auth, async (req, res) => {
    const postId = req.params.postId;
    console.log("postId from like api :", postId);
    let post = await Post.findById(postId);
    const isLiked = post.likes.includes(req.id);
    let updatedPostLike;
    try {
        if (isLiked) {
            updatedPostLike = await Post.findByIdAndUpdate(
                postId,
                {
                    $pull: { likes: req.id },
                    $inc: { likesCount: -1 },
                },
                { new: true }
            );

            return res.status(200).json({ likeState: false });
        } else {
            updatedPostLike = await Post.findByIdAndUpdate(
                postId,
                {
                    $push: { likes: req.id },
                    $inc: { likesCount: 1 },
                },
                { new: true }
            );

            return res.status(200).json({ likeState: true });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(403).json({
            message: error.message,
        });
    }
});

//get all posts (Propagated)
postRoute.get("/", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const posts = await Post.find()
            .limit(limit * page)
            .populate({ path: "likes", select: "_id name avatar" })
            .populate({ path: "author", select: "_id name avatar" });
        const postDocuments = await Post.countDocuments();

        let hasMore = postDocuments > limit * page ? true : false;

        res.status(200).json({ posts, hasMore });
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
});

//get user and users posts
postRoute.get("/user/:userId", async (req, res) => {
    // console.log("userId", req.params.userId);

    try {
        const user = await User.findById(req.params.userId)
            .populate("posts")
            .select({ token: 0, password: 0 });
        const posts = user.posts;
        res.status(200).json({ user, posts });
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
});

//single post with details
postRoute.get("/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
            .populate({ path: "likes", select: "_id name avatar" })
            .populate({ path: "author", select: "_id name avatar" })
            .populate({
                path: "comments",
                populate: { path: "author", select: "_id name avatar" },
            })
            .lean();
        res.status(200).json(post);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
});
//edit post (only if owner)
postRoute.patch("/:postId", auth, async (req, res) => {
    console.log(`"caption":${req.body.caption},
                "image": ${req.body.image},`);

    try {
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                caption: req.body.caption,
                image: req.body.image,
            },
            { new: true }
        ).lean();
        res.status(200).json(post);
    } catch (error) {
        console.log(error.message);

        return res.status(403).json({ message: error.message });
    }
});
//delete own post
postRoute.delete("/:postId", auth, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json(post);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
});

export default postRoute;
