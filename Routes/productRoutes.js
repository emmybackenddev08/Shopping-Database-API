const express = require('express');
const { uploadProduct, getAllProducts } = require('../controller/productController');
const upload = require('../config/multer');
const jwt = require('jsonwebtoken');

const router = express.Router();

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

router.post('/upload', verifyToken, upload.single('image'), uploadProduct);
router.get('/getall', getAllProducts);

module.exports = router;