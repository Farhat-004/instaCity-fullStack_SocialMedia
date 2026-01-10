import "dotenv/config";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token required" });
    }
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "access Token required" });
    }
    jwt.verify(token, process.env.AUTH_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({ message: err.message });
        }
        req.name = user.name;
        req.id = user.id;
        next();
    });
};
