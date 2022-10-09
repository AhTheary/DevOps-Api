const Jwt = require('jsonwebtoken')

// const createASessionToken = (userId, email) => {
//     return Jwt.sign({
//         _id: userId,
//         email,
//     }, 'jwt-secret');
// }

const createASessionToken = (userId, username) => {
    return Jwt.sign({
        _id: userId,
        username,
    }, 'jwt-secret');
}

module.exports = {
    createASessionToken
}