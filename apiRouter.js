const express = require("express")
const schemas = require("./schemas")
const mongoose = require("mongoose")
const API = express.Router()
const newsAPI = require("./dataRoutes/newsAPI")
const memberApi = require("./dataRoutes/memberAPI")
const ProfileAPI = require("./dataRoutes/profileAPI")

const MemberModal = mongoose.model("Member", schemas.memberSchema)


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

/*
Profile Section All POST related 
to members component will be Handled Here
*/

API.get("/member", (req, res)=>{
    memberApi.getMember(MemberModal).then((val)=>{res.send(val)}).catch((err)=>{console.log(err)})
})

/*
End of Member Section
*/



/*
Profile Section All GET and POST related 
to profile component will be Handled Here
*/
API.route('/profile')
        .get( (req, res) => {
            ProfileAPI.getProfile(MemberModal, req.query.username).then((val) => {res.send(val);})
        })
        .post( async (req, res) => {
            try{
                if(req.body != null)
                {
                    ProfileAPI.updateProfile(MemberModal, req.body, req.query.username).then((val) =>{res.send(val)});
                }
            } catch(err){
                res.status(400)
                console.log(err)
            }
        })

/*
End of Profile Section
 */

module.exports = API