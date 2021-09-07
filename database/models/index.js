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
    books: [{}],
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

module.exports = AuthorSchema = mongoose.model("authors", AuthorSchema)