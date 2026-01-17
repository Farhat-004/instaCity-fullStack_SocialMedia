import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const authRoute = express.Router();

authRoute.post("/signup", async (req, res) => {
    res.set("Cache-Control", "no-store");
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (!name || !email || !password) {
        return res
            .status(401)
            .json({ message: "provide all the infos required" });
    }
    const response = await User.insertOne({ name, email, password });
    res.status(201).json({
        name: response.name,
        email: response.email,
        id: response._id,
    });
});

authRoute.post("/token", async (req, res) => {
    res.set("Cache-Control", "no-store");
    const refreshToken = req.body.refreshToken;

    const isAvailable = await User.findOne({
        "token.refreshToken": refreshToken,
    });
    if (refreshToken == null) {
        return res.status(401).json({ message: "token is null" });
    }
    if (isAvailable) {
        return res.status(403).json({ message: "refresh token not found" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.status(404);
        const newAccessToken = jwt.sign(
            { name: user.name },
            process.env.AUTH_TOKEN,
            {
                expiresIn: "2m",
            },
        );
        res.status(200).json({
            name: user.name,
            accessToken: newAccessToken,
            refreshToken: refreshToken,
        });
    });
});
authRoute.post("/login", async (req, res) => {
    res.set("Cache-Control", "no-store");
    const userFound = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });

    if (!userFound) {
        console.log("invalid credentials");

        return res.status(401).json({ message: "invalid credentials" });
    }

    const accessToken = jwt.sign(
        { name: userFound.name, id: userFound._id },
        process.env.AUTH_TOKEN,
        {
            expiresIn: "20m",
        },
    );
    const refreshToken = jwt.sign(
        { name: userFound.name },
        process.env.REFRESH_TOKEN,
    );
    //adding the tokens in db
    const updatedUser = await User.findOneAndUpdate(
        {
            email: req.body.email,
            password: req.body.password,
        },
        { token: { accessToken: accessToken, refreshToken: refreshToken } },
        { new: true, select: { password: 0, __v: 0, token: 0 } },
    );
    console.log(200);

    res.status(200).json({
        user: updatedUser,
        accessToken,
        refreshToken,
    });
});

export default authRoute;
