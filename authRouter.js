const express = require("express")
const schemas = require("./schemas")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const md5 = require("md5")
const AuthRouter = express.Router()
const authAPI = require("./dataRoutes/authAPI")
const {
    response
} = require("express")
const MemberModel = mongoose.model("Member", schemas.memberSchema)
const MemberRequestModal = mongoose.model("MemberRequest", schemas.memberRequestSchema)
const secret = "knfsngslvmsomedofksmbhonf535wr2343363fsgdvgfhhedge644785";
AuthRouter.route("/login")
    .post((req, res) => {
        authAPI.Login(req.body, MemberModel, secret).then((value) => {
            res.send(value)
        })
    })

AuthRouter.route("/login/verify")
    .post((req, res) => {
        authAPI.verifyLogin(req.body.token, secret, MemberModel).then((val) => res.send({
            "status": val
        }))
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
            //If Validated then status is true else false
            authAPI.Join(member).then((val) => {
                if (val.errors) {
                    res.status(200).json({
                        "status": false,
                        "message": "Validation Failed"
                    })
                } else {
                    res.status(200).json({
                        "status": true,
                        "message": "Success"
                    })
                }
            }).catch((err) => {
                res.status(200).json({
                    err,
                    "status": false,
                    "message": "Validation Failed"
                });
            })
        } else {
            res.status(200).send({
                "status": false,
                "message": "Please Accept The Terms"
            });
        }
    })


//Accept OF Reject Join Request

AuthRouter.route("/join/requests")
    .post((req, res) => {
        const role = jwt.verify(req.body.token, secret, {}, (err, decoded) => {
            if (err) {
                res.status(400).send(err)
            } else {
                if (decoded.role == "admin") {
                    authAPI.getRequests(MemberRequestModal).then((val) => {
                        res.send(val)
                    });
                }
            }
        })
    })

AuthRouter.route("/join/request")
    .post((req, res) => {
        jwt.verify(req.body.token, secret, {}, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                if (data.role == "admin") {
                    if (req.body.status == "A") {
                        authAPI.acceptRequest(req.body.id, MemberRequestModal).then((val) => {
                            res.send({
                                "status": true
                            })
                        }).catch((err) => {
                            return({
                                "status": true
                            })
                        })
                    } else {
                        authAPI.rejectRequest(req.body, MemberRequestModal).then((val) => {
                            res.status(200).send({
                                "status": val
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                }
            }
        })
    })


module.exports = AuthRouter