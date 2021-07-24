const express = require("express")
require("dotenv").config()
const app = express()

const port = process.env.PORT_NUMBER

const apiRoutes = require("./api/index")

app.use("/api", apiRoutes)

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})