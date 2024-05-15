const asyncErrorWraper = require("express-async-handler")
const CustomError = require("../../helpers/error/CustomError")
const Question = require("../../models/question")


const checkQuestionExist = asyncErrorWraper(async(req, res, next) => {

    const { slug } = req.params
    const question = await Question.findOne({
        slug : slug
    })

    if(!question){
        return next(new CustomError("There is no such question with that slug", 400))
    }

    next()
})

const checkUserAndQuestionExist = asyncErrorWraper(async(req, res, next) => {
    const { slug } = req.params

    const question = await Question.findOne({
        slug: slug,
        user: req.user
    })

    if(!question){
        return next(new CustomError("There is no question with that slug associated with user", 400))
    }

    next()

})

module.exports = {
    checkQuestionExist,
    checkUserAndQuestionExist
}