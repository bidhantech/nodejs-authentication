const createError = require("http-errors")

const BadRequestError = (message = "Something Went Wrong!") => {
    return createError(400, message)
}

const AuthenticationError = (message = "Authentication Error!") => {
    return createError(401, message)
}

const ForbiddenError = (message = "Something Went Wrong!") => {
    return createError(403, message)
}

const NotFoundError = (message = "Not Found!") => {
    return new createError(404, message)
}

module.exports = {
    BadRequestError,
    AuthenticationError,
    ForbiddenError,
    NotFoundError
}