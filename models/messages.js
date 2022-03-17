const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    from: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content:
    {  
        type: String,
        required: true
    } 
},
    {
        timestamps: true
    }
)


const Message = mongoose.model('Message', messageSchema)

module.exports = Message;