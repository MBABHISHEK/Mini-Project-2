const asyncErrorWrapper = require("express-async-handler")
const Question = require("../models/question")
const deleteImageFile = require("../helpers/Libraries/deleteImageFile")
const { searchHelper, paginateHelper } = require("../helpers/query/queryHelper")

const addQuestion = asyncErrorWrapper(async(req, res, next) => {
    const {category, content} = req.body

    //var wordCount = content.trim().split(/\s+/).length
    //console.log("in addQuestion")
    //console.log(category + " " + content)
    try{
        console.log(req.body)
        console.log(req.savedQuestionImage)
        const newQuestion = await Question.create({
            category,
            content,
            user: req.user._id,
            image: req.savedQuestionImage
        })
        console.log(newQuestion)
        console.log("inside question controller")
        return res.status(200).json({
            success: true,
            message: "question added successfully",
            data: newQuestion
        })
    }
    catch(error){
        console.log("error")
        deleteImageFile(req)
        return next(error)
    }
})

const getAllQuestions = asyncErrorWrapper(async(req, res, next) => {
    let query = Question.find()

    query = searchHelper("category", query, req)

    const paginationResult = await paginateHelper(Question, query, req)

    console.log(paginationResult.page + " " + paginationResult.pages + " " + paginationResult.query)

    query = paginationResult.query

    query = query.sort("-likeCount -answerCount -createdAt")

    const questions = await query

    return res.status(200).json(
        {
            success: true,
            count: questions.length,
            data: questions,
            page: paginationResult.page,
            pages: paginationResult.pages
        }
    )
})

const detailQuestion = asyncErrorWrapper(async(req, res, next) => {
    const { slug } = req.params

    const { activeUser } = req.body

    const question = await Question.findOne({
        slug: slug
    }).populate("user likes")

    const questionLikeUserIds = question.likes.map(json => json.id)

    const likeStatus = questionLikeUserIds.includes(activeUser._id)

    return res.status(200).json({
        success: true,
        data: question,
        likeStatus: likeStatus
    })
})

const likeQuestion = asyncErrorWrapper(async(req, res, next) => {
    const { activeUser } = req.body
    const { slug } = req.params

    const question = await Question.findOne({
        slug: slug
    }).populate("user likes")

    const questionLikeUserIds = question.likes.map(json=>json._id.toString())

    if(!questionLikeUserIds.includes(activeUser._id)){
        question.likes.push(activeUser)
        question.likeCount = question.likes.length
        await question.save()
    }
    else{
        const index = questionLikeUserIds.indexOf(activeUser._id)
        question.likes.push(activeUser)
        question.likeCount = question.likes.length
        await question.save()
    }
    return res.status(200).json({
        success: true,
        data: question
    })
})

const editQuestionPage = asyncErrorWrapper(async(req, res, next) => {
    const { slug } = req.params

    const question = await Question.findOne({
        slug: slug
    }).populate("user likes")

    return res.status(200).json({
        success: true,
        data: question
    })
})

const editQuestion = asyncErrorWrapper(async(req, res, next) => {
    const { slug } = req.params
    const { category, content, image, previousImage } = req.body

    const question = await Question.findOne({
        slug: slug
    })

    question.category = category
    question.content = content
    question.image = req.savedQuestionImage

    if(!req.savedQuestionImage){
        //if the image is not sent
        question.image = image
    }

    else{
        //if the image is sent
        //delete old image location
        deleteImageFile(req, previousImage)
    }

    await question.save()

    return res.status(200).json({
        success: true,
        data: question
    })
})

const deleteQuestion = asyncErrorWrapper(async(req, res, next) => {
    const { slug } = req.params

    const question = await Question.findOne({slug: slug})

    deleteImageFile(req, question.image)

    await question.remove()

    return res.status(200).json({
        success: true,
        message: "question deleted successfully"
    })
})

module.exports = {
    addQuestion,
    getAllQuestions,
    detailQuestion,
    likeQuestion,
    editQuestionPage,
    editQuestion,
    deleteQuestion
}