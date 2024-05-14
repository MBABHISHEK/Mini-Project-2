const express = require("express")
const imageupload = require("../helpers/Libraries/imageUpload")
const { getAccessToRoute } = require("../middlewares/authorization/auth")
const { addQuestion, getAllQuestions, detailQuestion, likeQuestion, editQuestion, editQuestionPage, deleteQuestion } = require("../controllers/questionController")
const { checkQuestionExist, checkUserAndQuestionExist } = require("../middlewares/database/databaseErrorhandler")

const router = express.Router()

router.post("/addQuestion", [getAccessToRoute, imageupload.single("image")], addQuestion)

router.post("/:slug", checkQuestionExist, detailQuestion)

router.post("/:slug/like", [getAccessToRoute, checkQuestionExist], likeQuestion)

router.get("/editQuestion/:slug", [getAccessToRoute, checkQuestionExist, checkUserAndQuestionExist], editQuestionPage)

router.put("/:slug/edit", [getAccessToRoute, checkQuestionExist, checkUserAndQuestionExist, imageupload.single("image")], editQuestion)

router.delete("/:slug/delete", [getAccessToRoute, checkQuestionExist, checkUserAndQuestionExist], deleteQuestion)

router.get("/getAllQuestions", getAllQuestions)

module.exports = router


