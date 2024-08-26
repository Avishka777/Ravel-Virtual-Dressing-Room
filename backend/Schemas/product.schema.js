const Joi = require('joi');

const productSchema = Joi.object({

    
    categoryId: Joi.string(),
    // thumbnailImage: Joi.string(),
    // image: Joi.string(),
    name: Joi.string(),
    price: Joi.number().min(0).positive().required(),
    description: Joi.string(),
    
})

module.exports = productSchema
