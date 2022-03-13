const User = require("../models/Users");
const Post = require("../models/posts");
const Community = require('../models/communities');
const e = require("connect-flash");


exports.post_post = (req, res) => {
    let post = new Post(req.body);
    post.user = req.user;
    post.likes = 0;
    if (req.body.community == 'null')
    {
        post.community = undefined;
        post.save()
        .then((post)=>{
            req.user.posts.push(post)
            req.user.save()
            .then(()=>{
                res.redirect('/main');
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
                        res.redirect('/main');
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