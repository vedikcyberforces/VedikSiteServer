const express = require("express")
const schemas = require("./schemas")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const md5 = require("md5")
const AuthRouter = express.Router()


AuthRouter.route("/login")
.post((req, res)=>{
    res.send(req.body)
})


module.exports = AuthRouter

















