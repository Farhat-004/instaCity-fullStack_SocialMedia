import express from "express";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import cors from "cors";
import commentRouter from "./routes/comment.js";
const app = express();
const PORT = 4000;

//database connection
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", (err) => {
    console.log(err);
});
db.once("open", () => {
    console.log("db connected successfully");
});

//middlewares
app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL, //frontend's address
    })
);

//routers
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/posts", commentRouter);

app.listen(PORT, () => {
    console.log("Server is running at 4000 port");
});
