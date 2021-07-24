const express = require("express")
const router = express.Router()

/**
 * @api {post} /auth/login Login as a User
 * @apiName login
 * @apiGroup Auth
 *
 * @apiParam {String} email of the user.
 * @apiParam {String} password of the user.
 *
 * @apiSuccess {Object} data data object
 * @apiSuccess {String} data.jwt_token JWT Token
 * @apiSuccess {String} data.message Success Message
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "jwt_token": "eyjhjhjhj.ytytjgjgjgjgjgjgjgj.hhhghjh",
 *       "message": "Logged In Successfully"
 *     }
 *
 */
router.post("/login", (req, res) => {
    res.status(200).send({"message": "Login route is working..."})
})

router.post("/register", (req, res) => {
    res.status(201).send({"message": "User Created Successfully!"})
})

module.exports = router