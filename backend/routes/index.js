const express = require("express")

const router = express.Router()

const authRoute = require("./auth")
const questionRoute = require("./question")
const answerRoute = require("./answer")
const userRoute = require("./user")

/* router.use("./auth", authRoute)
router.use("./answer", answerRoute)
router.use("./question", questionRoute)
router.use("./user", userRoute)
 */
router.get("/", (req, res) => {
    res.json({"message": ["alskhfnasoibfg", "oasdhnawuiegfaweonf"]})
})

module.exports = router