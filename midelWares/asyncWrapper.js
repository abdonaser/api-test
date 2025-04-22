module.exports = (asyncControllerFunction) => {
    return (req, res, next) => {
        asyncControllerFunction(req, res, next).catch((error) => {
            // console.log("from wrapper ==>  ", err)
            return next(error)
        })
    }
}