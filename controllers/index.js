const User = require("../models/Users");

exports.main_get = (req, res) => {
    req.user.populate('communities')
    .then(() => {
        res.render("main/main")
    })
    .catch(err => {
        console.log(err);
        res.send(err)
    });
}

exports.search_get = (req, res) =>{
    res.render('main/search')
}

exports.notifications_get = (req, res) =>{
    res.render("main/notifications")
}

exports.messages_get = (req, res) =>{
    res.render("main/messages")
}

exports.settings_get = (req, res) =>{
    res.render("main/profile_settings")
}