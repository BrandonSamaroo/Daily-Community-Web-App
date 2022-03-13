const User = require("../models/Users");
const Post = require("../models/posts");
const Community = require('../models/communities');
const { redirect } = require("express/lib/response");

exports.create_community_get = (req, res) =>{
    res.render("main/create_community")
}

exports.create_community_post = (req, res) =>{
    let community = new Community(req.body);
    community.users.push(req.user)
    community.save()
    .then((community)=>{
        req.user.communities.push(community);
        req.user.save();
        res.redirect('/main')
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
}

exports.community_get = (req, res)=>{
    Community.findOne({name: req.params.name}).populate(
    {
        path: 'posts',
        populate : [
            {path: 'user'},
            {path: 'community'}
        ]
    })
    .then(community => {
        res.render("main/community", {community: community})
    })
    .catch(err => {
        console.log(err);
        res.send(err)
    });
}