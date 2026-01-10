import express from "express";
import userRoute from "./routes/user.js";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import cors from "cors";
import commentRoute from "./routes/comment.js";
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
        origin: "http://localhost:5173", // Match your frontend's address
    })
);

//routers
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/posts", commentRoute);

app.listen(PORT, () => {
    console.log("Server is running at 4000 port");
});
