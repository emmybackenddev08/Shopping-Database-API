const cloudinary = require('cloudinary').v2;
//import {v2 as cloudinary} from 'cloudinary'; (For ES6 module syntax, if you're using that instead of CommonJS)

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY ,
    api_secret : process.env.API_SECRET
})

module.exports = cloudinary;