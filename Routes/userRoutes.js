const express = require("express")
const jwt = require("jsonwebtoken")
const userRoute = express.Router()

const { createUser, deleteUser, getAllUsers, getSingleUser, updateUser, loginUser } 
= require("../controller/userController")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>" format

    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};

// Apply the verifyToken middleware to all routes except for login and create user
userRoute.post("/new-user", createUser)
userRoute.get("/all-users", getAllUsers)
userRoute.get("/get-one-user/:id", getSingleUser)
userRoute.delete("/delete-user/:userId", deleteUser)
userRoute.patch("/update-user/:userId", updateUser)
userRoute.post("/login", loginUser)

module.exports = userRoute