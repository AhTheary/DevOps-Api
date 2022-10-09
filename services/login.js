const Users = require("../models/users");
const { createASessionToken } = require('../services/utils');

const login = async(username, password) => {
    try {
        // check if email existed
        const user = await Users.findOne({ username })
        if (!user)
            throw 'The user is not found~'

        if (!user.matchesPassword(password)) {
            throw "The user's information is incorrect~"
        }

        const token = createASessionToken(user._id, user.username);
        return {
            success: true,
            data: {
                user,
                token,
            }
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err,
        }
    }
}

module.exports = {
    login
}