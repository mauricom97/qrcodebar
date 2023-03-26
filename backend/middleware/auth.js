
module.exports = async function (req, res, next) {
    try {
        next()
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}