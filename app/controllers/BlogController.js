const mongoose = require("mongoose");
const passport = require("passport");
const BlogModel = require("../models/Blog");

const blogController = {};

blogController.getAllBlogs = (req, res) => {
    BlogModel.find({}).then(blogs => {
        res.send(blogs);
    });
};

blogController.getBlogById = (req, res, next) => {
    BlogModel.findById(req.params.id).then(blog => {
        if (!blog) {
            let err = new Error('Not found');
            err.status = 404;
            next(err);
            return;
        }
        res.send(blog);
    }).catch(err => {
        err.status = 404;
        next(err)
    });
};

blogController.postBlog = (req, res) => {
    let blog = new BlogModel(req.body);
    blog.save().then(createdBlog => {
        res.json(createdBlog);
    })
}

blogController.updateBlogById = (req, res, next) => {
    BlogModel.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert: true})
        .then(blog => {
            res.json(blog);
        }).catch(err => {
        err.status = 404;
        next(err);
    });
};

blogController.deleteBlogById = (req, res, next) => {
    BlogModel.findByIdAndRemove(req.params.id)
        .then(deletedBlog => {
            res.json({
                id: deletedBlog.id
            });
        })
        .catch(err => {
            err.status = 404;
            next(err);
        }
    );
};

module.exports = blogController;