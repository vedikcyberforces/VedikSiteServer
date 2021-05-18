const insertPost = async (post) => {
    try {
        return await post.save();
    } catch (err) {
        return err;
    }
};

const getPost = async (model) => {
    try {
        return result = await model.find();
    } catch (err) {
        console.log(err)
    }
};


module.exports = {
    insertPost,
    getPost,
}