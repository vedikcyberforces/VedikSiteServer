const mongoose = require("mongoose")
const timezone = require("moment-timezone")

var memberSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true,
    },
    password:{
        type:String,
        required: true
    },
    time: {
        type:Date, 
        default:Date.now
    }
}) 

module.exports  = {memberSchema}