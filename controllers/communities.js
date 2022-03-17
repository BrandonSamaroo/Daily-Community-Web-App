const User = require("../models/Users");
const Post = require("../models/posts");
const Community = require('../models/communities');
const { redirect } = require("express/lib/response");
const moment = require("moment");
const e = require("connect-flash");

exports.create_community_get = (req, res) =>{
    res.render("main/create_community")
}

exports.create_community_post = (req, res) =>{
    let community = new Community(req.body);
    let imagPath = '/assets/' + req.file.filename;
    community.profilePicture = imagPath;
    community.users.push(req.user)
    community.save()
    .then((community)=>{
        req.user.communities.push(community);
        req.user.save();
        res.redirect(`/communities/${req.user.userName}`);
    })
    .catch((err)=>{
        console.log(err)
        res.redirect('/create/community')
    })
}

exports.community_get = (req, res)=>{
    let displayFollow = true
    Community.findOne({name: req.params.name}).populate(
    {
        path: 'posts',
        populate : [
            {path: 'user'},
            {path: 'community'}
        ]
    })
    .then(community => {
        if(req.user.communities.includes(community.id)){
            displayFollow = false
        }
        res.render("main/community", {community, posts: community.posts, moment, displayFollow: displayFollow})
    })
    .catch(err => {
        console.log(err);
        res.send(err)
    });
}

exports.community_follow_get = (req, res) =>{
    Community.findOne({name: req.params.name})
    .then((community)=>{
        if (community.users.includes(req.user.id)){
            console.log('you are already in community')
        }
        else{
            community.users.push(req.user);
            community.save()
            .then(()=>{
                req.user.communities.push(community)
                req.user.save()
                .then(()=>{
                    res.redirect('back');
                })
                .catch(()=>{
                    console.log(err);
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    })
}

exports.community_settings_get = (req, res)=>{
    Community.findOne({name: req.params.name})
    .then((community)=>{
        if(req.user.id != community.users[0]){
            res.send("you can not access this")
        }
        else{
            res.render("main/community_settings", {community});
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

exports.community_picture_post = (req, res) =>{
    Community.findOne({name: req.params.name})
    .then((community)=>{
        if (req.file){
            let imagPath = '/assets/' + req.file.filename;
            community.profilePicture = imagPath;
            community.save()
            .then(()=>{
                res.redirect(`/community/${community.name}`)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else{
            res.redirect('back')
        }
    })
}

exports.community_delete_get = (req, res)=>{
    Community.findOne({name: req.params.name})
    .then((community)=>{
        if(req.user.id != community.users[0]){
            res.send("you can not access this")
        }
        else{
            res.render("main/community_delete", {community});
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

exports.community_delete_post = (req, res)=>{
    if(req.body.option === "YES"){
        Community.findOne({name: req.params.name})
        .then((community)=>{
            res.redirect('/')
        })
    }
    else{
        res.redirect('back')
    }
}

exports.community_bio_post = (req, res) =>{
    Community.findOne({name: req.params.name})
    .then((community)=>{
        community.bio = req.body.bio
        community.save()
        .then(()=>{
            res.redirect(`/community/${community.name}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}