const jwt = require("jsonwebtoken")
const fs = require("fs")

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

function storeFS(inputObj, fileObj) {
    const image = inputObj.image
    const saveLocation = "../api/uploads"
    // Check if a file was posted
    if(args.file.filename) {
        const { filename, mimetype, createReadStream } = fileObj
        const stream = createReadStream()
        const fullPath = `${saveLocation}/${filename}_${Math.random() * 10 + 1}`

        return new Promise((resolve, reject) => 
            stream.on('error', error => {
                if (stream.truncated) {
                    fs.unlinkSync(fullPath)
                    reject(error)
                }
            }).pipe(fs.createWriteStream(fullPath))
                .on('error', error => reject(error))
                .on("finish", ({ path }) => {
                    return Object.assign({}, inputObj, { image: path })
                })
        )

    }
    return image
}

module.exports = {
    getPortNo,
    verifyToken,
    storeFS,
}