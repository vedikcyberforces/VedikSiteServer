const insertNews = async (model) => {
    try {
        return await model.save()
    } catch (err) {
        return err;
    }
}

const getNews = async (model) => {
    try {
        return result = await model.find().select({news:1}).sort("-news").exec()
    } catch (err) {
        console.log(err)
    }
};

const newsAPI = new Object();



module.exports = {
    insertNews,
    getNews
}