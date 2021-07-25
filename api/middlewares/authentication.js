const jwt = require("jsonwebtoken")

const isAuthenticated = (req, res, next) => {
    try {
        if (!req.headers["authorization"]) {
            return res.status(401).json({ "message": "Token missing from Authorization header!" })
        }
        
        const token = req.headers["authorization"].split(" ")[1]
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        req._userId = tokenData._userId

        if (!req._userId) {
            return res.status(401).json({ "message": "Invalid jwt token!" })
        }

        next()
    } catch (error) {
        return res.status(401).json({ "message": error.message })
    }

}

module.exports = { isAuthenticated }