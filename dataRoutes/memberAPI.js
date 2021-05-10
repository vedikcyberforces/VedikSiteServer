
const getMember = async (model) => {
    try {
        return result = await model.find().exec()
    } catch (err) {
        console.log(err)
    }
};

module.exports = {
    getMember
}