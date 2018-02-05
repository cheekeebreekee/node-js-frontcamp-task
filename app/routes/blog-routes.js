const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const BlogModel = require('../models/blog');
const remoteDbUrl = require('./../../config/db').url;
const blog = require("../controllers/BlogController.js");

mongoose.connect(remoteDbUrl)
        .then(() =>  console.log('connection succesful'))
        .catch((err) => console.error(err));

// const db = mongoose.connection;

const checkForLogin = () => {
    return function(req, res, next) {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            res.status(401).send({
                success: false,
                message: 'You need to be authenticated to access this page!'
            });
        } else {
            next()
        }
    }
}

router.get('/', checkForLogin(), blog.getAllBlogs);

router.get('/:id', blog.getBlogById);

router.post('/', blog.postBlog);

router.put('/:id', blog.updateBlogById);

router.delete('/:id', blog.deleteBlogById);

module.exports = router;