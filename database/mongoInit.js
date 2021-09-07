const mongoose = require("mongoose")

require("dotenv").config()

const uri = process.env.MONGO_URI


async function dbInitialize() {
    mongoose.connect(uri)
            .then(() => console.log("Mongo connected"))
            .catch(err => console.error(err))
}

module.exports = dbInitialize
