const mongoose = require("mongoose")

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide a name']
    },
    status: {
        type: String,
        required: true,
        enum: ['BEST_SELLER', 'RISING', 'NEW']
    },
    books: [{
        title: {
            type: String
        },
        desc: {
            type: String
        },
        content: {
            type: String
        },
        image: {
            type: String
        },
        audio: {
            type: String
        },
        price: {
            type: String
        }, 
        date_added: {
            type: Date,
            default: Date.now
        }
    }],
    market_tag: {
        type: String,
        enum: ['FEATURED', 'SELLING_FAST', 'INTERESTING']
    },
    author_bio: {
        type: String,
        maxlength: 1024,
        default: ""
    },
    date_created: {
        type: Date,
        default: Date.now
    }
})

const Authors = mongoose.model("authors", AuthorSchema)
module.exports = Authors