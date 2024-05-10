const mongoose = require("mongoose")

const AnswerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Question"
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [3, " Please provide a content least 3 characters"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    likeCount: {
        type: Number,
        default: 0
    },

}, { timestamps: true })


const Answer = mongoose.model("answer", CommentSchema)

module.exports = Answer;