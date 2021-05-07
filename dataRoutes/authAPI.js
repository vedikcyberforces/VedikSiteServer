const insertModel = async (res, model) => {
    try {
        const result = await model.save()
        res.status(200).json({"data": result})
    } catch (err) {
        res.status(400).json({"status":"Bad Request", "data": err})
    }
}

const getModel = async (res, model, options, reverse, limit) => {
    try {
        const newses = await model.find(options).limit(limit)
        if(reverse){
            res.status(200).json(newses.reverse());
        }
        else{
            res.status(200).json(newses);
        }
    } catch (err) {
        console.log(err);
    }
};

const authAPI = new Object();

authAPI.insertModel = insertModel;
authAPI.getModel = getModel;

module.exports = authAPI