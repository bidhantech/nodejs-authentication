const express = require("express")
const { getUserById } = require("../controllers/user")
const router = express.Router()

/**
 * @api {get} /users/me Get LoggedIn User Details
 * @apiName Me API
 * @apiGroup Users
 *
 * @apiHeader {String} authorization Authorization header in the format: Bearer jwttoken
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdXNlcklkIjoiNjBmY2NhMzU4Nzg3ODQzMjI1ZGNkNWEyNTkiLCJpYXQiOjE2MjcxODc1MTIsImV4cCI6MTYyNzI3MzkxMn0.n_oCLc0shsU2DErB6F2ECRQOjQczannoLowo80JZVhI"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "_id": "60fcca35a2d43225dcd5a256",
 *   "isEmailVerified": false,
 *   "firstName": "Test",
 *   "middleName": "ok",
 *   "lastName": "User",
 *   "email": "test5@example.com",
 *   "createdAt": "2021-07-25T04:51:55.943Z",
 *   "updatedAt": "2021-07-25T04:51:55.943Z",
 *   "__v": 0
 * }
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 401 Authentication Error
 *  {
 *   "message": "Token missing from Authorization header!"
 *  } 
 * 
 *  HTTP/1.1 401 Authentication Error
 *  {
 *   "message": "Invalid jwt token!"
 *  }
 * 
 *  HTTP/1.1 401 Authentication Error
 *  {
 *   "message": "jwt expired"
 *  } 
 * 
 *  HTTP/1.1 404 Not Found Error
 *  {
 *   "message": "User Not Found!"
 *  } 
 *
 *
 */
router.get("/me", async (req, res) => {
    try {
        const response = await getUserById(req._userId)
        res.status(200).json(response)
    } catch (error) {
        res.status(error.status).json({ message: error.message })
    }
})

module.exports = router