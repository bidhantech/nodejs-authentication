const express = require("express")
const router = express.Router()
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const { isAuthenticated } = require("./middlewares/authentication")

router.get("/status", (req, res) => {
    res.status(200).send({"message": "Server  is running..."})
})

router.use("/auth", authRoutes)


// Authentication Middleware to alow only loggedIn user to access below routes
router.use(isAuthenticated)
router.use("/users", userRoutes)


module.exports = router