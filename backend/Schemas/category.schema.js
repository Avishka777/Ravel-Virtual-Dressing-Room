const Joi = require('joi');

const categorySchema = Joi.object({

    categoryId: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    subCategoryName: Joi.string()

})

module.exports = categorySchema;