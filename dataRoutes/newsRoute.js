const schemas = require("../schemas")
const mongoose = require("mongoose")
const express = require("express")

const API = express.Router()
const newsModel = mongoose.model("News", schemas.newsSchema)
API.route("/")
    .get((req, res) => {
       databaseAccess.getModel(res, newsModel, {},true)
    })
    .post((req, res) => {
        try {
            if (req.body != null) {
                const news = new newsModel({
                    news: req.body.news,
                    uploadedBy: req.body.uploadedBy,
                    time: req.body.time
                })

                databaseAccess.insertModel(res, news);

            }

        } catch (err) {
            res.status(400)
            console.log(err)
        }
    })

   
const insertNews = async (res, model) => {
    try {
        const result = await model.save()
        res.status(200).json({"data": result})
    } catch (err) {
        res.status(400).json({"status":"Bad Request", "data": err})
    }
}

const getNews = async (res, model) => {
    try {
        const newses = await model.find(options)
        if(reverse){
            res.status(200).json(newses);
        }
        else{
            res.status(200).json(newses);
        }
    } catch (err) {
        console.log(err);
    }
};
/*
End Of News Secion
*/

module.exports = API