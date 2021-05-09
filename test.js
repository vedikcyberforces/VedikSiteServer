const express = require("express")
const schemas = require("./schemas")
const mongoose = require("mongoose")
const API = express.Router()
const newsAPI = require("./dataRoutes/newsAPI")
const jwt = require("jsonwebtoken")
const md5 = require("md5")

const connectionString = "mongodb://uajzdwzvtbbbvfvswtv9:jxw4FArUsjEtkIRNzQxm@bhjsg7ylqkh73ne-mongodb.services.clever-cloud.com:27017/bhjsg7ylqkh73ne";
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected")).catch((err) => console.log(err))

/*
News Section All the GET and POST Request related
to news component will be Handled Here
*/
//const news = new newsModel({"news":"This is a new news the latest one"})
// const newsModel = mongoose.model("News", schemas.newsSchema)
const MemberRequestModal = mongoose.model("MemberRequest", schemas.memberRequestSchema)
const MemberModal = mongoose.model("Member", schemas.memberSchema)
// MemberRequestModal.deleteMany({}).exec((err, res)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("It's done bitch")
//     }
// })
// const result = newsModel.find().sort({_id:-1}).exec();
// result.then(v=>{console.log(v)})   

/*
    For Json Web Token 
*/

//console.log(jwt.sign({"role": "admin"}, "knfsngslvmsomedofksmbhonf535wr2343363fsgdvgfhhedge644785"))
// MemberModal.find().limit(6).exec().then((val) => console.log(val)).catch((err) => {
//     console.log(err)
// })
console.log(MemberModal.find({"username":"himanshurajora", "password": md5("M6e6TeNeIn")}).countDocuments().exec().then((val)=>console.log(val)))
// MemberRequestModal.findByIdAndUpdate("609780b93f6b764f90fb3e002", {
//         status: 'A'
//     },
//     function (err, docs) { 
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("Updated User : ", docs);
//         }
//     });