const nodemailer = require("nodemailer")
const generator = require("generate-password")
const schemas = require("../schemas")
const ourmail = "aicephotoc@gmail.com";


const mailer = new nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,

    auth: {
        user: ourmail,
        pass: 'aicephotoc@123'
    }
})

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const md5 = require("md5");

const Join = async (model) => {
    try {
        return await model.save()
    } catch (err) {
        return err
    }
}

const memberModel = mongoose.model("Member", schemas.memberSchema);

const getRequests = async (model) => {
    try {
        return await model.find({
            status: "Q"
        }).select({
            firstname: 1,
            lastname: 1,
            id: 1,
            phone: 1,
            email: 1,
            username: 1,
            time: 1
        }).exec()
    } catch (err) {
        console.log(err)
    }
};

/*
Function for Jwt Verification

Will be called many times for autheticatoin in different routes to determine what to show to the user
*/

const verifyLogin = async (token, secret, model) => {
    response = false;
    //return jwt.verify(token, secret)  
    try {
        //If token is verified than return True else False if will affect the gui login page 
        jwt.verify(token, secret, {}, (err, payload) => {
            if (err) {
                response = false;
            } else {
                response = true;
            }

        })
        return response;

        // if (data) {
        //     const result = await model.findOne({
        //         username: data.username
        //     }).countDocuments()
        //     if (result) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // } else {
        //     return false;
        // }

    } catch (err) {
        return false
    }

}

const Login = async (data, model, secret) => {
    try {
        var count = 0 
        model.findOne({
            username: data.username,
            password: md5(data.password)
        }).countDocuments().exec().then(val=>count=val)
        console.log(count)
        const result = await model.findOne({
            username: data.username,
            password: md5(data.password)
        }).exec()
        if (result != null && count > 0) {
            if (data.rememberMe) {
                return {
                    "status": jwt.sign({
                        "username": result.username,
                        "role": result.role,
                        "email": result.email,
                        "phone": result.phone
                    }, secret)
                }
            } else {
                return {
                    "status": jwt.sign({
                        "username": result.username,
                        "role": result.role,
                        "email": result.email,
                        "phone": result.phone
                    }, secret, {
                        expiresIn: '30m'
                    })
                }
            }
        } else {
            return {
                "status": false
            }
        }
    } catch (err) {
        return {
            "status": false
        }
    }
};


const acceptRequest = async (Userid, model) => {
    try {
        var result = await model.findOne({
            _id: Userid
        })
        var saved = false;
        var gpassword = generator.generate({
            length: 10,
            numbers: true
        })
        var mailOptions = {
            from: ourmail,
            to: result.email,
            subject: 'VCF Joining Request Accepted',
            text: 'Hello ' + result.firstname + ',\n Your Request Has Been Accepted \n Here is The un: ' + result.username + " And\n ps: " + gpassword
        };
        const member = new memberModel({
            "firstname": result.firstname,
            "lastname": result.lastname,
            "email": result.email,
            "phone": result.phone,
            "username": result.username,
            "password": md5(gpassword)
        })
        await model.findByIdAndUpdate(result.id, {
            status: 'A'
        },
        function (err, docs) { 
            if (err) {
                console.log(err)
            } else {
                update = true;
            }
        });

        await member.save().finally(() => {
            saved = true
        }).catch(err => {
            console.log(err)
        })

        mailer.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return (update && saved)
    } catch (err) {
        return err
    }
}

const rejectRequest = async (data, model)=>{
    var update = false
    await model.findByIdAndUpdate(data.id, {
        status: 'R'
    },
    function (err, docs) { 
        if (err) {
            console.log(err)
        } else {
            update = true;
        }
    });

    return update

}

module.exports = {
    Login,
    Join,
    getRequests,
    verifyLogin,
    acceptRequest,
    rejectRequest
}