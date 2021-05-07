const express = require("express")
const schemas = require("./schemas")
const mongoose = require("mongoose")
const API = express.Router()
const newsAPI = require("./dataRoutes/newsAPI")


const connectionString = "mongodb://uajzdwzvtbbbvfvswtv9:jxw4FArUsjEtkIRNzQxm@bhjsg7ylqkh73ne-mongodb.services.clever-cloud.com:27017/bhjsg7ylqkh73ne";
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected")).catch((err) => console.log(err))

/*
News Section All the GET and POST Request related
to news component will be Handled Here
*/

const newsModel = mongoose.model("News", schemas.newsSchema)
const news = new newsModel({"news":"This is a new news the latest one"})

const result = newsModel.find().sort({_id:-1}).exec();
result.then(v=>{console.log(v)})   