const User = require("../models/Users");
const Post = require("../models/posts");
const Community = require('../models/communities');

//populate posts users and posts communities
exports.profile_get = (req, res) =>{
    User.findOne({userName: req.params.username}).populate(
    {
        path: 'posts',
        populate : [
            {path: 'user'},
            {path: 'community'}
        ]
    })
    .then(user => {
        res.render("main/profile", {user: user})
    })
    .catch(err => {
        console.log(err);
        res.send(err)
    });
}

exports.profile_communities_get = (req, res) =>{
    User.findOne({userName: req.params.username}).populate('communities')
    .then(user => {
        res.render("main/profile_communities", {user: user})
    })
    .catch(err => {
        console.log(err);
    });
}

exports.profile_follow_get = (req, res) =>{
    User.findOne({userName: req.params.username})
    .then(user => {
        req.user.following.push(user);
        req.user.save()
        .then(()=>{
            res.redirect(`/profile/${req.user.userName}`)
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })
    })
    .catch(err => {
        console.log(err);
    });
}