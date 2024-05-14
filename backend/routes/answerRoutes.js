const express = require("express")

const { getAccessToRoute } = require("../middlewares/authorization/auth")

const {addNewAnswerToQuestion, getAllAnswerByQuestion, answerLikes, getAnswerLikeStatus } = require("../controllers/answerController")

const { checkQuestionExist } = require("../middlewares/database/databaseErrorhandler")

const router = express.Router()

router.post("/:slug/addAnswer", [getAccessToRoute, checkQuestionExist], addNewAnswerToQuestion)

router.get("/:slug/getAllAnswer", getAllAnswerByQuestion)

router.post("/:answer_id/like", answerLikes)

router.post("/:answer_id/getAnswerLikeStatus", getAnswerLikeStatus)

module.exports = router
