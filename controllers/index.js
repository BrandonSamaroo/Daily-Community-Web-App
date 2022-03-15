const User = require("../models/Users");
const Community = require('../models/communities');
const moment = require("moment");
const e = require("connect-flash");

exports.main_get = (req, res) => {
    let postsToDisplay = {};
    req.user.populate([
        {path: 'communities',
        populate : [
            {path: 'posts',
            populate : [
                {path: 'user'},
                {path: 'community'}
            ]},
        ]}, 
        {path: 'following',
        populate : [
            {path: 'posts',
            populate : [
                {path: 'user'},
                {path: 'community'}
            ]},
        ]}
    ])
    .then((user) => {
        user.communities.forEach((community) =>{
            community.posts.forEach((post) =>{
                postsToDisplay[post._id] = post;
            })
        })
        user.following.forEach((following) =>{
            following.posts.forEach((post) =>{
                postsToDisplay[post._id] = post;
            })
        })
        postsToDisplay = Object.values(postsToDisplay)
        postsToDisplay.sort().reverse();
        res.render("main/main", {moment, posts: postsToDisplay})
    })
    .catch(err => {
        console.log(err);
        res.send(err)
    });
}

exports.search_get = (req, res) =>{
    res.render('main/search', {activeSearch: false})
}

exports.search_post = (req, res) =>{
    if (req.body.option == "communties"){
        Community.find({name: {$regex: req.body.name}})
        .then((communities)=>{
            res.render('main/search', {activeSearch: true, communities: communities, users: []})
        })
        .catch((err)=>{
            console.log(err);
            res.send(err)
        })
    }
    else if(req.body.option == "users"){
        User.find({userName: {$regex: req.body.name}})
        .then((users)=>{
            console.log(users)
            res.render('main/search', {activeSearch: true, users: users, communities: []})
        })
        .catch((err)=>{
            console.log(err);
            res.send(err)
        })
    }
    else{
        res.redirect('back')
    }
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