// const User = require("../models/users");
// const bcrypt = require('bcrypt');
// const salt = 10;
// const passport = require('passport');
// const {validationResult} = require('express-validator');
// const flash = require('connect-flash');

exports.home_get = (req, res) => {
    res.render("home/index",{ layout: 'homeLayout' });
}