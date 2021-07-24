const express = require("express")
const router = express.Router()
const authRoutes = require("./routes/auth")

router.get("/status", (req, res) => {
    res.status(200).send({"message": "Server  is running..."})
})

router.use("/auth", authRoutes)

module.exports = router