const Feedbacks = require("../models/feedbacks");

const findById = async(id) => {
    return await Stores.findById(id);
};

const findAll = async(req, res) => {
    try {
        return await Feedbacks.find();
    } catch (error) {
        return error;
    }
};

const create = async(newFeed) => {
    const createFeed = await Feedbacks.create(newFeed);
    return {
        success: true,
        message: "User sent feedback!",
        data: createFeed,
    };
};

const remove = async(id) => {
    const removeStore = await Feedbacks.findByIdAndRemove(id);
    console.log("Removed");
    return {
        success: true,
        message: "Delete user review history",
        data: removeStore,
    };
};

module.exports = {
    findById,
    remove,
    findAll,
    create,
};