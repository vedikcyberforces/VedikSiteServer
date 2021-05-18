const insertArt = async (art) => {
    try {
        return await art.save();
    } catch (err) {
        return err;
    }
};

const getArt = async (model) => {
    try {
        return result = await model.find();
    } catch (err) {
        console.log(err)
    }
};


module.exports = {
    insertArt,
    getArt,
}