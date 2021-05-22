const updateProfile = async (model, body, username) => {
    try {

        console.log(avatar)
        await model.findOneAndUpdate({username:username},
            {
                title:body.title,
                about: body.about,
                firstname: body.firstname,
                lastname: body.lastname,
                avatar_url: body.avatar,
                tools: body.tools,
            }, (err, object) => {
            if(err)
            {
                return err;
            }
            else{
                return object;
            }
        });
    } catch (err) {
        return err;
    }
}

const getProfile = async (model, username) => {
    try {
        return result = await model.find({ username: username});
    } catch (err) {
        console.log(err)
    }
};




module.exports = {
    updateProfile,
    getProfile
}