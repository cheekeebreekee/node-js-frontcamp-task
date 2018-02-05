const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/User");

const userController = {};

userController.home = function(req, res) {
    res.render('index', {
        title: 'Hello',
        greet: 'Nice to see u',
        user : req.user
    });
};

userController.signup = function(req, res) {
    res.render('signup');
};

userController.postSignup = function(req, res) {
    User.register(
        new User({
            username : req.body.username,
            name: req.body.name
        }),
        req.body.password,
        (err, user) => {
            if (err) return res.render('signup', { user : user });
            
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        }
    );
};

userController.login = function(req, res) {
    res.render('login');
};

userController.doLogin = function(req, res) {
    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
};

userController.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

module.exports = userController;