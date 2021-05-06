const express = require("express")
const schemas = require("./schemas")
const mongoose = require("mongoose")
const API = express.Router()


const insertModel = async (res, model) => {
    try {
        const result = await model.save()
        res.status(200).json({"data": result})
    } catch (err) {
        res.status(400).json({"status":"Bad Request", "data": err})
    }
}

const getModel = async (res, model, options, reverse, limit) => {
    try {
        const newses = await newsModel.find(options).limit(limit)
        if(reverse){
            res.status(200).json(newses.reverse());
        }
        else{
            res.status(200).json(newses);
        }
    } catch (err) {
        console.log(err);
        return
    }
};
/*
News Section All the GET and POST Request related
to news component will be Handled Here
*/

const newsModel = mongoose.model("News", schemas.newsSchema)

API.route("/news")
    .get((req, res) => {
        getModel(res, newsModel, {},true)
    })
    .post((req, res) => {
        try {
            if (req.body != null) {
                const news = new newsModel({
                    news: req.body.news,
                    uploadedBy: req.body.uploadedBy,
                    time: req.body.time
                })

                insertModel(res, news);

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