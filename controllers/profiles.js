const User = require("../models/Users");
const Post = require("../models/posts");
const Community = require('../models/communities');

//populate posts users and posts communities
exports.profile_get = (req, res) =>{
    let displayFollow = true;
    let yourAccount = false;
    User.findOne({userName: req.params.username}).populate(
    {
        path: 'posts',
        populate : [
            {path: 'user'},
            {path: 'community'}
        ]
    })
    .then(user => {
        if (user.id == req.user.id){
            displayFollow = false;
            yourAccount = true;
        }
        if(req.user.following.includes(user.id)){
            displayFollow = false;
        }
        res.render("main/profile", {user, displayFollow, yourAccount})
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


//turn off follow button and dont allow pushing to mongo if already following
//or is ur profile
exports.profile_follow_get = (req, res) =>{
    User.findOne({userName: req.params.username})
    .then(user => {
        if(user.id == req.user.id ){
            res.send("error")
            return;
        }
        if(req.user.following.includes(user.id)){
            res.send('error')
            return;
        }
        else{
            req.user.following.push(user);
            req.user.save()
            .then(()=>{
                user.followers.push(req.user)
                user.save()
                .then(()=>{
                    res.redirect(`/profile/${req.user.userName}`);
                })
                .catch((err)=>{
                    res.send('error')
                })
            })
            .catch((err)=>{
                console.log(err);
                res.send(err);
            })
        }
        
    })
    .catch(err => {
        console.log(err);
    });
}