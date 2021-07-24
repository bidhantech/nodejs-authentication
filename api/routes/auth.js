const express = require("express")
const router = express.Router()

router.post("/login", (req, res) => {
    res.status(200).send({"message": "Login route is working..."})
})

router.post("/register", (req, res) => {
    res.status(201).send({"message": "User Created Successfully!"})
})

module.exports = router