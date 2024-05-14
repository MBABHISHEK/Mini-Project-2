const express = require("express")

const router = express.Router()

const authRoutes = require("./authRoutes") 
const questionRoutes = requrie("./questionRoutes")
const answerRoutes = require("./answerRoutes")
const userRoutes = require("./userRoutes")

router.use("/auth", authRoutes)
router.use("/question", questionRoutes)
router.use("/user", userRoutes)
router.use("/answer", answerRoutes)
 
router.get("/", (req, res) => {
    res.json({"message": ["alskhfnasoibfg", "oasdhnawuiegfaweonf"]})
})

module.exports = router