const express = require("express")
const imageUpload = require("../helpers/Libraries/imageUpload")
const { getAccessToRoute } = require("../middlewares/authorization/auth")
const { addQuestion, getAllQuestions, detailQuestion, likeQuestion, editQuestion, editQuestionPage, deleteQuestion } = require("../controllers/questionController")
const { checkQuestionExist, checkUserAndQuestionExist } = require("../middlewares/database/databaseErrorhandler")

const router = express.Router()

router.post("/addQuestion", [getAccessToRoute, imageUpload.single("image")], addQuestion)

router.post("/:slug", checkQuestionExist, detailQuestion)

router.post("/:slug/like", [getAccessToRoute, checkQuestionExist], likeQuestion)

router.get("/editQuestion/:slug", [getAccessToRoute, checkQuestionExist, checkUserAndQuestionExist], editQuestionPage)

router.put("/:slug/edit", [getAccessToRoute, checkQuestionExist, checkUserAndQuestionExist, imageUpload.single("image")], editQuestion)

router.delete("/:slug/delete", [getAccessToRoute, checkQuestionExist, checkUserAndQuestionExist], deleteQuestion)

router.get("/getAllQuestions", getAllQuestions)

module.exports = router


