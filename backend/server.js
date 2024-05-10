const express = require("express")
const app = express()
const dotenv = require("dotenv")
const path = require("path")
const cors = require("cors")
const bodyParser = require("body-parser")


const connectDatabase = require("./helpers/database/connectDatabase")

dotenv.config({
    path: './Config/config.env'
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get("/", (req, res) => {
    res.json({"message": ["alskhfnasoibfg", "oasdhnawuiegfaweonf"]})
})


const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    connectDatabase()
    console.log(`server running on port ${PORT}`)
})

process.on("unhandledRejection", (err, promise) => {

    console.log(`Logged error: ${err}`)

    server.close(() => process.exit(1))
})