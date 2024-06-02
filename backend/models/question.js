const mongoose = require("mongoose")
const Answer = require("./answer")
const slugify = require("slugify")

const QuestionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    slug: String,
    category: {
        type: String,
        required: [true, "Please provide a category"],
        unique: true,
        minlength: [4, "Please provide a category of atleast 4 characters "]
    },
    content:{
        type: String,
        required: [true, "Please a provide a content "],
        minlength: [10, "Please provide a content of atleast 10 characters "],
    },
    image:{
        type: String,
        default: "default.jpg"
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    likeCount: {
        type: Number,
        default: 0
    },
    answers: [{
            type: mongoose.Schema.ObjectId,
            ref: "Answer"
    }],
    AnswerCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

QuestionSchema.pre("save", function (next) {
    if(!this.isModified("category"))
        next()
    //console.log("inside pre-hook in addquestion")
    this.slug = this.makeSlug()
    //console.log('after makeSlug')
    next()
})

QuestionSchema.pre("remove", async function (next) {

    const question = await Question.findById(this._id)

    await Answer.deleteMany({
        question : question 
    })
    next()

})

QuestionSchema.methods.makeSlug = function () {
    return slugify(this.category, {
        replacement: '-',
        remove: /[*+~.()'"!:@/?]/g,
        lower: true,
        strict: false,
        locale: 'tr',
        trim: true
    })

}

const Question = mongoose.model("question", QuestionSchema)

module.exports = Question;