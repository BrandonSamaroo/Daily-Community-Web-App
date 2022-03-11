const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    community: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes:
    {
        type: Number,
        required: true,
    },
    content:
    {
        type: String,
        required: true,

    },
    replies:
    [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    parent:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

},
    {
        timestamps: true
    }
)


const Post = mongoose.model('Post', postSchema)

module.exports = Post;