const insertProjects = async (project) => {
    try {
        return await project.save();
    } catch (err) {
        return err;
    }
};

const getProjects = async (model) => {
    try {
        return result = await model.find();
    } catch (err) {
        console.log(err)
    }
};

const getProjectsById = async (model, id) => {
    try{
        return result = await model.find({_id: id});
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    insertProjects,
    getProjects,
    getProjectsById
}