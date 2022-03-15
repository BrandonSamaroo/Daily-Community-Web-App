const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: 
    {
        type: String,
        required: true,
        minlength: [3, "First name must be longer than 3 characters"],
        maxlength: [20, "First name must be less than 20 characters"]
    },
    lastName:
    {
        type: String,
        required: true,
        minlength: [3, "Last name must be longer than 3 characters"],
        maxlength: [20, "Last name must be less than 20 characters"]
    },
    emailAddress:
    {
        type: String,
        required: true,
        lowercase: true,
        unique: [true, "Email address already exists"]
    },
    password:
    {
        type: String,
        required: true,
        minlength: [6, "Password name must be longer than 3 characters"]
    },
    userName:
    {
        type:String,
        required: true,
        lowercase: true,
        unique: [true, "Username already exists"],
        minlength: [5, "Username must be longer than 5 characters"],
        maxlength: [15, "Username must be less than 15 characters"]
    },
    posts:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    communities:
    [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    }],
    bio:
    {
        type:String,
        maxlength: [50, "bio must be less than 50 characters"]
    },
    profilePicture:
    {
        type:String,
    },
    followers:
    [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following:
    [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    {
        timestamps: true
    }
)

userSchema.methods.verifyPassword = function(password)
{
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema)

module.exports = User;