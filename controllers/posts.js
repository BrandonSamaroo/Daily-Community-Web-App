const User = require("../models/Users");
const Post = require("../models/posts");
const Community = require('../models/communities');
const flash = require("connect-flash");
const moment = require("moment");


exports.post_post = (req, res) => {
    let post = new Post(req.body);
    post.user = req.user;
    if (req.body.community == 'null')
    {
        post.community = undefined;
        post.save()
        .then((post)=>{
            req.user.posts.push(post)
            req.user.save()
            .then(()=>{
                res.redirect('back');
            })
            .catch((err)=>{
                console.log(err)
                res.send(err)
            })
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }
    else{
        Community.findOne({name: req.body.community})
        .then((community)=>{
            post.community = community;
            post.save()
            .then((post)=>{
                community.posts.push(post)
                community.save()
                .then(()=>{
                    req.user.posts.push(post)
                    req.user.save()
                    .then(()=>{
                        res.redirect('back');
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.send(err)
                    }) 
                })
                .catch((err)=>{
                    console.log(err)
                    res.send(err)
                })
            })
            .catch((err)=>{
                console.log(err)
                res.send(err)
            })
        })
        .catch((err) =>
        {
            console.log(err)
            res.send(err)
        })
    }
}


exports.post_like_post = (req,res) =>{
    Post.findById(req.params.id)
    .then(post => {
        if(post.likes.includes(req.user.id)){
            console.log("youve already liked this post")
        }
        else if(post.user == req.user.id){
            console.log("this is your post")
        }
        else{
            post.likes.push(req.user)
        }
        post.save()
        .then(()=>{
            res.redirect('back');
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err);
    });
}

exports.post_get = (req, res)=>{
    Post.findById(req.query.id).populate([
        {path: 'user'},
        {path: 'community'},
        {path: 'replies', 
            populate: 
            [{path: 'user'},
            {path: 'community'}]},
        {path: 'parent', 
            populate: 
            [{path: 'user'},
            {path: 'community'}]}
    ])
    .then(post => {
        console.log(post.parent)
        res.render('main/user_post', {posts: post.replies, moment, post, parent: post.parent});
    })
    .catch(err => {
        console.log(err);
    });
}

exports.reply_post = (req,res) =>{
    let reply = new Post(req.body);
    reply.user = req.user;
    Post.findById(req.params.id)
    .then((post)=>{
        reply.parent = post
        reply.save()
        .then(()=>{
            post.replies.push(reply)
            post.save()
            .then(()=>{
                res.redirect('back');
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err);
    })
}