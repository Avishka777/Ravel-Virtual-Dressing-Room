const Joi = require('joi');

const sizeSchema = Joi.object({
    sizeId: Joi.string(),
    name: Joi.string(),
    code: Joi.string(),
})

module.exports = sizeSchema;