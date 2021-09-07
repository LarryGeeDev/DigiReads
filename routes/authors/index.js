const router = require("express").Router()

router.get('/', (req, res) => {
    res.send("Welcome, author!")
})

module.exports = router