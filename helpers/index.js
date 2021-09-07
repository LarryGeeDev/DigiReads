function getPortNo(array) {
    const portInfo = array[array.length - 1]
    const port = portInfo.replace(/[^\d]*/, "")

    return Number.parseInt(port)
}

module.exports = {
    getPortNo,
}