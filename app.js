const express = require("express")
const app = express()
const mongoose = require("mongoose")
const apiRoutes = require("./api/index")

// logger to log request & response info
const morgan = require("morgan")
const logger = morgan(":method :url :status - :response-time ms")

// environment variables
require("dotenv").config()
const port = process.env.PORT_NUMBER
const dbUrl = process.env.DB_CONNECTION_STRING

// Handle Database connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection
db.on("connected", () => {
    console.log("Successfully connected to database...")
})
db.on("error", () => {
    console.log("Error connecting to database...")
})


app.use(logger)
app.use(express.json())
app.use("/api", apiRoutes)
app.use("/docs", express.static(__dirname + "/docs"));

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}...`)
})