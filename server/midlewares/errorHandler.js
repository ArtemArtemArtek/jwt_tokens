const ApiError = require('../apiError/api_error')

module.exports = function (error, req, res, next) {
    console.log("ОШИБКА В КОНСОЛИ:"+error)
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message, errors: error.errors })
    }
    return res.status(500).json({ message: "Непредвиденная ошибка сервера", errors: error.errors })
}