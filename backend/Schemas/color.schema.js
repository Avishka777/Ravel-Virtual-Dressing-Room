const Joi = require('joi');

const colorSchema = Joi.object({
    colorId: Joi.string(),
    name: Joi.string().required(),
    code: Joi.string().required()
})

module.exports = colorSchema;