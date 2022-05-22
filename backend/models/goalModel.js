const mongoose = require('mongoose')




const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, "Please add a text value"],
        minlength: 6,
    }
}, 
{
    timestamps: true
})

const Goal = mongoose.model('Goal', goalSchema)
module.exports = Goal