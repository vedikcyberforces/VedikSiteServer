
const getMember = async (model) => {
    try {
        return result = await model.find().select({
            username:1,
            lastname:1,
            firstname:1,
            about:1,
            avatar_url:1
        })
    } catch (err) {
        console.log(err)
    }
};

module.exports = {
    getMember
}