const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
    name: 
    {
        type: String,
        required: true,
        minlength: [3, "name must be more than 3 characters"],
        maxlength: [20, "name must be less than 20 characters"],
        unique: [true, "Community already exists"]
    },
    profilePicture:
    {
        type:String,
        required: true
    },
    bio:
    {
        type:String,
        maxlength: [50, "bio must be less than 50 characters"],
        required: true
    },
    users:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    posts:
    [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    
},
    {
        timestamps: true
    }
)

const Community = mongoose.model('Community', communitySchema)

module.exports = Community;