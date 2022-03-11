const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
    name: 
    {
        type: String,
        required: true,
        minlength: [3, "name must be more than 3 characters"],
        maxlength: [20, "name must be less than 20 characters"]
    },
    profilePicture:
    {
        type:String,
        //implement after
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