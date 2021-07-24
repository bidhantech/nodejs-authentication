const express = require("express")
require("dotenv").config()
const app = express()
const morgan = require("morgan")

const port = process.env.PORT_NUMBER
const logger = morgan(":method :url :status - :response-time ms")

const apiRoutes = require("./api/index")


app.use(logger)
app.use(express.json())
app.use("/api", apiRoutes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})