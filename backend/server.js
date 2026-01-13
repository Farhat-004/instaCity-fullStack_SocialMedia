import express from "express";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import commentRouter from "./routes/comment.js";
const app = express();
const PORT = 4000;
const server = http.createServer(app);
//socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (roomId) => {
        console.log(`User ${socket.id} joined the room ${room}`);
    });
    socket.on("send_message", (data) => {
        socket.to(data.roomId).emit("receive_message", data);
    });
    socket.on("typing", ({ username, roomId }) => {
        socket.to(room).emit("user_typing", username);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
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

server.listen(PORT, () => {
    console.log("Server is running at 4000 port");
});
