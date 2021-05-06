const mongoose = require("mongoose")
const timezone = require("moment-timezone")

//Member Requests
const memberRequestSchema = mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    time: {
        type: Date,
        default: Date.now
    }
})

// Member Schema
const memberSchema = mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
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
    newsSchema,
    memberRequestSchema
}