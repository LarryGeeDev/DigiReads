const mongoose = require("mongoose")
const logger = require("../logger")

require("dotenv").config()

const uri = process.env.MONGO_U


async function dbInitialize() {
    mongoose.connect(uri)
            .then(() => logger.info("DB connected"))
            .catch(err => logger.error("An error occured while connecting to DB: "+err))
}

module.exports = dbInitialize
