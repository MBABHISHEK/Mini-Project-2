const asyncErrorWrapper = require("express-async-handler")
const Question = require("../models/question")
const Answer = require("../models/answer")

const addNewAnswerToQuestion = asyncErrorWrapper( async(req, res, next) => {

    const { slug } = req.params

    const { content } = req.body

    const question = await Question.findOne({slug: slug})

    const answer = await Answer.create({
        question: question._id,
        content: content,
        user: req.user.id
    })

    question.answers.push(answer._id)

    question.AnswerCount = question.answers.length

    await question.save()

    return res.status(200).json({
        success: true,
        data: answer
    })
 })

 const getAllAnswerByQuestion = asyncErrorWrapper(async(req, res, next) => {

    const { slug } = req.params

    const question = await Question.findOne({ slug: slug })

    const answerList = await Answer.find({
        question: question._id
    }).populate({
        path: "user",
        select: "username photo"
    }).sort("-createdAt")

    return res.status(200).json({
        success: true,
        count: question.AnswerCount,
        data: answerList
    })
 })

 const answerLikes = asyncErrorWrapper(async(req, res, next) => {

    const { activeUser } = req.body
    const { question_id } = req.params

    const answer = await Answer.findById(question_id)

    if(!answer.likes.includes(activeUser._id)){

        answer.likes.push(activeUser._id)
        answer.likeCount = answer.likes.length

        await answer.save()
    }

    else{

        const index = answer.likes.indexOf(activeUser._id)
        answer.likes.splice(index, 1)
        await answer.save()

    }

    const likeStatus = answer.likes.includes(activeUser._id)

    return res.status(200).json({
        success: true,
        data: answer,
        likeStatus: likeStatus
    })
 })

 const getAnswerLikeStatus = asyncErrorWrapper(async(req, res, next) => {

    const { activeUser } = req.body
    const { answer_id } = req.params

    const answer = await Answer.findById(answer_id)
    const likeStatus = answer.likes.includes(activeUser._id)

    return res.status(200).json({
        success: true,
        likeStatus: likeStatus
    })
 })

 module.exports = {
    addNewAnswerToQuestion,
    getAllAnswerByQuestion,
    answerLikes,
    getAnswerLikeStatus
 }