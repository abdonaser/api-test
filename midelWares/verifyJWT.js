const jwt = require('jsonwebtoken')
const { ERROR } = require('../utils/json_status_text')
const appError = require('../utils/appError')

const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        const error = appError.create("Authorization header is missing or improperly formatted. Access denied.", 401, ERROR)
        return next(error)
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            const errorMessage = err.name == "TokenExpiredError" ? 'Your session has expired. Please log in again.'
                : 'The provided token is invalid or tampered with. Access forbidden.';
            const error = appError.create(errorMessage, 403, ERROR)
            return next(error)
        }



        if (!decoded?.userInfo) {
            const error = appError.create("Token payload is malformed.", 403, ERROR);
            return next(error);
        }

        req.user = {
            id: decoded.userInfo.id,
            role: decoded.userInfo.role, // Optional: Add roles or other payload details if available
        };
        // Proceed to the next middleware or route handler
        next();
    })
}



module.exports = verifyJWT