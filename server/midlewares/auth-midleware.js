const ApiError = require('../apiError/api_error')
const tokenService = require('../service/token_service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.Unauthorized());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.Unauthorized());
        }
        const userData = tokenService.validationAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.Unauthorized());
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.Unauthorized());
    }
};