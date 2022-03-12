const User = require("../models/Users");
const bcrypt = require('bcrypt');
const salt = 10;
const passport = require('passport');
const {validationResult} = require('express-validator');
const flash = require('connect-flash');

exports.home_signin_get = (req, res) => {
    res.render("home/index",{ layout: 'homeLayout' });
}

exports.home_signup_get = (req, res) => 
{
    res.render('home/signup' ,{ layout: 'homeLayout' });
};

exports.home_signup_post = (req, res) => 
{
    let user = new User(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt);

    user.password = hash;
    user.save()
    .then(() => {
        req.flash('success', 'Welcome to Daily Community please sign in!');
        res.redirect("/");
    })
    .catch((err) => {
        const errors = validationResult(req);
        if(err.code == 11000)
        {
            req.flash('error', 'email already entered')
        }
        else if (!errors.isEmpty())
        {
            req.flash('validationErrors', errors.errors)
        }
        res.redirect('/auth/signup')
    });
};

exports.home_signin_post = passport.authenticate("local", {
    successRedirect: '/main',
    failureRedirect: '/',
    failureFlash: 'invalid username or password',
    // successFlash: 'you are logged in successfully'
})

exports.home_signout_get = (req, res) =>
{
    req.logout();
    req.flash('success', 'You are sucessfully logged out')
    res.redirect("/");
};

