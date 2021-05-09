const mongoose = require("mongoose")
const timezone = require("moment-timezone")

//Member Requests
const memberRequestSchema = mongoose.Schema({

    firstname: {
        type: String,
        minLength:3,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        minLength:3,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        minLength:10,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        minLength:10,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        minLength:3,
        required: true,
        trim: true,
    },
    terms: {
        type: Boolean,
        required: true,
    },
    status:{
        type:String,
        default:"Q" //Q mean this is in The request queue Two more possible values : A - Accepted and R - Rejected 
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
    role:{
        type:String,
        trim:true,
        default:"member"
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