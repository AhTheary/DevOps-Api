const { options } = require("joi");
const Favorites = require("../models/favorites");

const findAll = async(req, res) => {
    const { user_id } = req.query;
    try {
        const favorites = await Favorites.find({ user: user_id }).populate({ path: "store" })
        console.log('favorites', favorites)
        return favorites;
    } catch (error) {
        return error;
    }
};

const create = async(store) => {
    const createFavorite = await Favorites.create(store);
    return {
        success: true,
        message: "You haved new favorite store",
        data: createFavorite,
    };
};

const remove = async(favId) => {
    const removeStore = await Favorites.findByIdAndRemove(favId);
    console.log("Removed");
    return {
        success: true,
        message: "Store is delete successfull",
        data: removeStore,
    };
};

module.exports = {
    remove,
    findAll,
    create,
};