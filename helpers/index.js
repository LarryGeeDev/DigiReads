const jwt = require("jsonwebtoken")

function getPortNo(array) {
    const portInfo = array[array.length - 1]
    const port = portInfo.replace(/[^\d]*/, "")

    return Number.parseInt(port)
}

function verifyToken(token) {
    if (!token) reject(new Error("Authorization header not set"))
        // if token, verify if correct
    try {
        let strippedToken = token.replace(/Bearer\s+/, '')  // replace Bearer + \s with ""
        const data = jwt.verify(strippedToken, process.env.JWT_SECRET)
        return data
    } catch (e) {
        throw new Error(e)
    }
}

module.exports = {
    getPortNo,
    verifyToken,
}