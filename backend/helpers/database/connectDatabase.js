const mongoose = require("mongoose")

const connectDatabase = async () => {

    await mongoose.connect(process.env.MONGO_URI)

}

const db = mongoose.connection;

db.once('connected', () => {
    console.log("Mongodb connection successful")

})

module.exports = connectDatabase