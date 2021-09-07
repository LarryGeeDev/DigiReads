const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'You must provide a name']
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        maxlength: 1024,
    },
    phoneNo: {
        type: String,
    },
    user_category: {
        type: String,
        enum: ["AUTHOR", "READER"]
    },
    profile_pic: {
        type: String,
    },
    password: {
        type: String,
        maxlength: 2048
    },
    date_created: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("users", userSchema)
module.exports = User