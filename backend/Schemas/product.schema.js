const Joi = require('joi');

const productSchema = Joi.object({
    productId: Joi.string().optional(), // This can be optional as it will be generated automatically.

    // Removed category as it is commented out in Mongoose schema
    category: Joi.string().required(),

    color: Joi.array().items(Joi.string()).optional(),

    size: Joi.array().items(Joi.string()).optional(),

    price: Joi.number().optional(),

    stock: Joi.number().integer().min(0).optional(),

    thumbnailImage: Joi.string().uri().optional().default('https://cloud-atg.moph.go.th/quality/sites/default/files/default_images/default.png'),

    image: Joi.array().items(Joi.string().uri()).optional(),

    name: Joi.string().max(50).required(),

    description: Joi.string().max(500).optional(),

    isActive: Joi.boolean().optional().default(true)
});

const productUpdateSchema = Joi.object({
    color: Joi.array().items(Joi.string()).optional(),

    size: Joi.array().items(Joi.string()).optional(),

    category: Joi.string().required(),

    price: Joi.number().optional(),

    stock: Joi.number().integer().min(0).optional(),

    thumbnailImage: Joi.string().uri().optional(),

    image: Joi.array().items(Joi.string().uri()).optional(),

    name: Joi.string().max(50).optional(),

    description: Joi.string().max(500).optional(),

    isActive: Joi.boolean().optional()
});

module.exports = {
    productSchema,
    productUpdateSchema
};
