
const insertModel = async (res, model) => {
    try {
        const result = await model.save()
        res.status(200).json({"data": result})
    } catch (err) {
        res.status(400).json({"status":"Bad Request", "data": err})
    }
}

const getModel = async (res, model) => {
    try {
        const newses = await model.find();
        res.send(newses)
    } catch (err) {
        res.send(err)
    }
};

const newsAPI = new Object();

newsAPI.insertModel = insertModel;
newsAPI.getModel = getModel;

module.exports = newsAPI