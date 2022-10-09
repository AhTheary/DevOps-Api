const Categories = require("../models/categories")

const findById = async(id) => {
    return await Categories.findById(id);
}

const findAll = async() => {
    return await Categories.find();
}

// const findCategorizedItems = async() => {
//     return await Categories.aggregate([{
//             $lookup: {
//                 from: "items",
//                 localField: "_id",
//                 foreignField: "category",
//                 as: "items"
//             }
//         },
//         {
//             $project: {
//                 _id: 1,
//                 name: 1,
//                 desc: 1,
//                 imageUrl: 1,
//                 items: {
//                     _id: 1,
//                     name: 1,
//                     category: 1,
//                     desc: 1,
//                 }
//             }
//         }
//     ])
// }

const create = async(newCategory) => {
    const createCate = await Categories.create(newCategory);
    return {
        success: true,
        message: "Create Categories successfull!",
        data: createCate
    };
}

const update = async(updateCategory) => {
    const { _id, name, desc, imageUrl } = updateCategory;
    const updateCate = await Categories.findByIdAndUpdate(_id, {
        name,
        desc,
        imageUrl
    });
    console.log("updated");
    return {
        success: true,
        message: "Up Categories successfull!",
        data: updateCate
    };
}

const remove = async(id) => {
    const removeCate = await Categories.findByIdAndRemove(id);
    console.log("Removed");
    return {
        success: true,
        data: removeCate,
        message: "delete is successfull"
    };
}

module.exports = {
    findById,
    update,
    remove,
    findAll,
    create,
    // findCategorizedItems
}