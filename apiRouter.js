const express = require("express")
const schemas = require("./schemas")
const mongoose = require("mongoose")
const API = express.Router()
const newsAPI = require("./dataRoutes/newsAPI")

/*
News Section All the GET and POST Request related
to news component will be Handled Here
*/

const newsModel = mongoose.model("News", schemas.newsSchema)
API.route("/news")
    .get((req, res) => {
        newsAPI.getNews(newsModel).then((val) => {res.send(val);});
    })
    .post((req, res) => {
        try {
            if (req.body != null) {
                const news = new newsModel({
                    news: req.body.news,
                    uploadedBy: req.body.uploadedBy,
                    time: req.body.time
                })

            }
        } catch (err) {
            res.status(400)
            console.log(err)
        }
    })

/*
End Of News Secion
*/

module.exports = API