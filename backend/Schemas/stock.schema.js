const Joi = require('joi');

const stockSchema = Joi.object({
    stockId: Joi.string(),
    productId:Joi.string(),
    sizeId:Joi.string(),
    colorId:Joi.string(),
    stockCount: Joi.number().integer().min(0).positive(),
})

module.exports = stockSchema;