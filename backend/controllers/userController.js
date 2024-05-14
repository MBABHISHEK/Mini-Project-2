const asyncErrorWrapper = require("express-async-handler")
const User = require("../models/user")
const Question = require("../models/question")
const CustomError = require("../helpers/error/CustomError")
const { comparePassword, validatePassword, validateUserInput } = require("../helpers/input/inputHelper")

const profile = asyncErrorWrapper(async(req, res, next) => {
    return res.status(200).json({
        success: true,
        data: req.user
    })
})

const editProfile = asyncErrorWrapper(async(req, res, next) => {
    const { email, password } = req.body

    const user = await User.findByIdAndUpdate(req.user.id, {
        email, username,
        photo: req.savedUserPhoto
    }, {
        new: true,
        runValidators: true
    })

    return res.status(200).json({
        success: true,
        data: user
    })
})

const changePassword = asyncErrorWrapper(async(req, res, next) => {
    const { newPassword, oldPassword } = req.body

    if(!validateUserInput(newPassword, oldPassword)){
        return next(new CustomError("Please check your inputs", 400))
    }

    const user = await User.findById(req.user.id).select("+password")

    if(!comparePassword(oldPassword, user.password)){
        return next(new CustomError("old password is incorrect", 400))
    }

    user.password = newPassword

    await user.save()

    return res.status(200).json({
        success: true,
        message: "password changed successfully",
        user: user
    })
})

module.exports = {
    profile,
    editProfile,
    changePassword
}