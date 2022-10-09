const Users = require("../models/users");
const { id } = require("../schemas/signUp");


const findById = async(id) => {
    try {
        const user = await Users.findById(id);
        return user;
    } catch (err) {
        return "User is not found"
    }
}

const findAll = async() => {
    return await Users.find();
}

const updatePass = async(updateUserpass, userId) => {
    const { oldpassword, newpassword, confirmNewpass } = updateUserpass;
    try {
        let updateUserInfo = await Users.findById(userId);
        if (updateUserInfo.matchesPassword(oldpassword)) {
            if (newpassword == confirmNewpass) {
                updateUserInfo.password = newpassword
            } else {
                throw "Password is not match"
            }
        } else {
            throw "Old password is incorrect"
        }
        await updateUserInfo.save()

        return {
            success: true,
            message: "Update password successfull",
        };
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}

const update = async(updateUserinfo) => {
    // to info user
    const { _id, firstName, lastName, phone } = updateUserinfo;

    let updateUserInfo = await Users.findById(_id);

    if (firstName) updateUserInfo.firstName = firstName
    if (lastName) updateUserInfo.lastName = lastName
    if (phone) updateUserInfo.phone = phone

    await updateUserInfo.save();

    return {
        success: true,
        message: "User is updated",
        data: updateUserInfo,
    };
}

const remove = async(id) => {
    const removeUser = await Users.findByIdAndRemove(id);
    console.log("Removed");
    return {
        success: true,
        message: "Users is delete successfull",
        data: removeUser,
    };
}

module.exports = {
    findById,
    updatePass,
    update,
    remove,
    findAll
}