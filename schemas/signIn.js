const Joi = require('joi');
module.exports = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    username: Joi.string()
});