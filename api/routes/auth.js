const express = require("express")
const { registerUser, loginUser } = require("../controllers/user")
const router = express.Router()

/**
 * @api {post} /auth/login Login as a User
 * @apiName login
 * @apiGroup Auth
 *
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiParamExample {json} Request-Example:
 *  {
 *   "email": "test5@example.com",
 *   "password": "test1234"
 *  }
 *
 * @apiSuccess {String} jwt_token JWT Token
 * @apiSuccess {String} message Success Message
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "jwt_token": "eyjhjhjhj.ytytjgjgjgjgjgjgjgj.hhhghjh",
 *       "message": "Logged In Successfully"
 *     }
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 401 Authentication Error
 *  {
 *   "messsage": "Email or password is incorrect!"
 *  } 
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *   "messsage": "Error Message"
 *  }
 *
 */
router.post("/login", async (req, res) => {
    try {
        const response = await loginUser(req.body)
        res.status(200).json({message: "Logged In Successfully!", "jwt_token": response})
    } catch (error) {
        res.status(error.status).json({ message: error.message })
    }
})


/**
 * @api {post} /auth/register Register User
 * @apiName registerUser
 * @apiGroup Auth
 *
 * @apiParam {String} firstName
 * @apiParam {String} middleName
 * @apiParam {String} lastName
 * @apiParam {String} email
 * @apiParam {String} password
 * 
 * @apiParamExample {json} Request-Example:
 *  {
 *   "email": "test5@example.com",
 *   "password": "test1234",
 *   "firstName": "Test",
 *   "middleName": "ok",
 *   "lastName": "User"
 *  }
 * @apiSuccess {String} message Success Message
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *   "message": "User Registered Successfully! Please verify Email!"
 *  }
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *   "messsage": "Email already exists!"
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *   "messsage": "Error Message"
 *  }
 */
router.post("/register", async (req, res) => {
    try {
        const response = await registerUser(req.body)
        res.status(201).json(response)
    } catch (error) {
        res.status(error.status).json({ message: error.message })
    }
})

module.exports = router