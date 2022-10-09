const Posts = require("../models/posts");

const findById = async(id) => {
    return await Posts.findById(id);
}

const findAll = async() => {
    // return await Posts.find().populate('category');
    return await Posts.find().populate({
        path: 'userId',
        select: { username: 1 }
    });
}

const create = async(newPost) => {
    const createPost = await Posts.create(newPost);
    console.log(createPost);
    return {
        success: true,
        message: "New Post is done!",
        data: createPost
    };
}

const update = async(updatePost) => {

    const { _id, userId, status, location, image, comment } = updatePost;
    const updatenewPost = await Posts.findByIdAndUpdate(_id, {
        userId: userId,
        status: status,
        location: location,
        image: image,
        comment: comment
    });
    return {
        success: true,
        message: "U update your post",
        data: updatenewPost
    };

}

const remove = async(id) => {
    const removePost = await Posts.findByIdAndRemove(id);
    console.log("Removed");
    return {
        success: true,
        message: "Post is is delete",
        data: removePost
    };
}

module.exports = {
    findById,
    update,
    remove,
    findAll,
    create,
}