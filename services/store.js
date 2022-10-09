const Stores = require("../models/stores");

const findById = async(id) => {
    return await Stores.findById(id);
};

const findAll = async(req, res) => {
    // try {
    //     return await Stores.find().populate('category');
    // } catch (error) {
    //     return ërror
    // }
    const { page, item_per_page, category, name } = req.query;

    try {
        let populates = {
            path: "category",
            select: { name: 1, desc: 1, imageUrl: 1 },
        };
        let options = {
            page: 1,
            limit: 8,
            populate: populates,
        };

        let filter = {};
        if (category) filter.category = category;
        if (name) {
            const regex = new RegExp(name, "i");
            filter.storeName = { $regex: regex }
        }

        if (page) options.page = page;
        if (item_per_page) options.limit = item_per_page;

        const stores = await Stores.paginate(filter, options);
        return { success: true, stores };
        //return await Stores.find().populate('category');
    } catch (error) {
        return { success: false, error: error };
    }
};

const create = async(newStore) => {
    const createStore = await Stores.create(newStore);
    return {
        success: true,
        message: "Ok store is Created",
        data: createStore,
    };
};

const update = async(updateStore) => {
    const { _id, storeName, ownerName, location, imageUrl, desc } = updateStore;
    const updatenewStore = await Stores.findByIdAndUpdate(_id, {
        storeName: storeName,
        ownerName: ownerName,
        location: location,
        desc: desc,
        imageUrl: imageUrl,
    });
    return {
        success: true,
        message: "Now Store is updated",
        data: updatenewStore,
    };
};

const remove = async(id) => {
    const removeStore = await Stores.findByIdAndRemove(id);
    console.log("Removed");
    return {
        success: true,
        message: "Store is delete successfull",
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