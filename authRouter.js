const express = require("express")
const schemas = require("./schemas")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const md5 = require("md5")
const AuthRouter = express.Router()
const databaseAccess = require("./databaseAccess")
const MemberModel = mongoose.model("User", schemas.memberSchema)
const MemberRequestModal = mongoose.model("MemberRequest", schemas.memberRequestSchema)

AuthRouter.route("/login")
    .post((req, res) => {
        const member = new MemberModel()

        // if(req.body){
        //     const result = MemberModel.find({"username": req.body.username, "password": md5(req.body.password)})
        // }
    })

AuthRouter.route("/join")
    .post((req, res) => {
        const member = new MemberRequestModal({
            "firstname": req.body.firstname,
            "lastname": req.body.firstname,
            "email": req.body.email,
            "phone": req.body.phone,
            "username": req.body.username
        })
        if(req.body){
            databaseAccess.insertModel(res, member)
        }
    })


module.exports = AuthRouter