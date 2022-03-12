const User = require("../models/Users");
const Post = require("../models/posts");
const Community = require('../models/posts');

exports.main_get = (req, res) => {
    res.render("main/main");
}
