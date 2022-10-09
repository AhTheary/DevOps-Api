const { populate } = require("../models/comments");
const Comments = require("../models/comments");

const findById = async(id) => {
    return await Comments.findById(id);
};

const findAll = async(req, res) => {
    const { userpostId } = req.query;
    try {
        const comments = await Comments.find({ userpostId: userpostId }).populate({
            path: 'usercommentId',
            select: { username: 1 }
        })
        console.log('comments', comments)
        return comments;
    } catch (error) {
        return error;
    }
};

const create = async(newComment) => {
    const createComment = await Comments.create(newComment);
    return {
        success: true,
        message: "Your comment has post",
        data: createComment,
    };
};

const update = async(updateReview) => {
    const { _id, star, comment } = updateReview;
    const updatenewReviews = await Comments.findByIdAndUpdate(_id, {
        star: star,
        comment: comment,
    });
    return {
        success: true,
        message: "Now Store is updated",
        data: updatenewReviews,
    };
};

const remove = async(id) => {
    const removeStore = await Comments.findByIdAndRemove(id);
    console.log("Removed");
    return {
        success: true,
        message: "Comment user is delete successfull",
        data: removeStore,
    };
};

module.exports = {
    findById,
    update,
    remove,
    findAll,
    create,
};