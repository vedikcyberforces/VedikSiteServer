const mongoose = require("mongoose")
const timezone = require("moment-timezone")

//Member Schema
const memberSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})

//News Schema
const newsSchema = mongoose.Schema({
    news: {
        type: String,
        required: true
    },
    uploadBy: {
        type: String,
        default: "VCF"
    },
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = {
    memberSchema,
    newsSchema
}