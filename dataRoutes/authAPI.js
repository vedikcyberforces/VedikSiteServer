const jwt = require("jsonwebtoken");
const Join = async (model) => {
    try {
        return await model.save()
    } catch (err) {
        return err
    }
}

const getRequests = async (model) => {
    try {
        return result = await model.find().select({
            firstname: 1,
            lastname: 1,
            id: 1,
            phone: 1
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
    console.log(token);
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
        const result = await model.findOne({
            username: data.username
        }).exec()
        if (result != null && Object.keys(result).length > 0) {
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

module.exports = {
    Login,
    Join,
    getRequests,
    verifyLogin
}