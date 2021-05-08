const express = require("express")
const schemas = require("./schemas")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const md5 = require("md5")
const AuthRouter = express.Router()
const authAPI = require("./dataRoutes/authAPI")
const MemberModel = mongoose.model("User", schemas.memberSchema)
const MemberRequestModal = mongoose.model("MemberRequest", schemas.memberRequestSchema)
const secret = "knfsngslvmsomedofksmbhonf535wr2343363fsgdvgfhhedge644785";
AuthRouter.route("/login")
    .post((req, res) => {
        authAPI.Login(req.body, MemberRequestModal, secret).then((value)=>{
            res.send(value)
        })
    })

AuthRouter.route("/login/verify")
    .post((req, res) => {
        authAPI.verifyLogin(req.body.token, secret, MemberRequestModal).then((val)=>res.send({"status":val}))
        // if(req.body){
        //     const result = MemberModel.find({"username": req.body.username, "password": md5(req.body.password)})
        // }
    })
AuthRouter.route("/join")
    .post((req, res) => {
        const member = new MemberRequestModal({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "email": req.body.email,
            "phone": req.body.phone,
            "username": req.body.username,
            "terms": req.body.terms
        })
        if (req.body && req.body.terms == true) {
            authAPI.Join(member).then(res.status(200))
        } else {
            res.status(400).send("Fill All The Details");
        }
    }).get((req, res) => {
        authAPI.getRequests(MemberRequestModal).then((val) => {
            res.send(val)
        });
    })


module.exports = AuthRouter