const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/User");

const userController = {};

userController.home = (req, res) => {
    res.render('index', {
        title: 'Hello',
        greet: 'Nice to see u',
        user : req.user
    });
};

userController.signup = (req, res) => {
    res.render('signup');
};

userController.postSignup = (req, res) => {
    User.register(
        new User({
            username : req.body.username,
            name: req.body.name
        }),
        req.body.password,
        (err, user) => {
            if (err) return res.render('signup', { user : user });
            
            passport.authenticate('local')(req, res,  () => {
                res.redirect('/');
            });
        }
    );
};

userController.login = (req, res) => {
    res.render('login');
};

userController.doLogin = (req, res) => {
    passport.authenticate('local')(req, res,  () => {
        res.redirect('/');
    });
};

userController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = userController;