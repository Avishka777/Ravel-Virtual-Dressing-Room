const Joi = require("joi");

// Schema for creating a cart
const cartCreateSchema = Joi.object({
  cartId: Joi.string().optional(), // Optional since it will be generated automatically
  userId: Joi.string().required(), // Required as per Mongoose schema
  productId: Joi.string().required(), // Required as per Mongoose schema
  size: Joi.string().required(), 
  color: Joi.string().required(), 
  quantity: Joi.number().integer().min(0).default(1).optional(), // Default is 1, can be optional
  price: Joi.number().min(0).optional(), // Optional, price per product
});

// Schema for updating a cart
const cartUpdateSchema = Joi.object({
  // userId: Joi.string().optional(), 
  // productId: Joi.string().optional(),
  size: Joi.string().optional(), 
  color: Joi.string().optional(),
  quantity: Joi.number().integer().min(1).optional(), // Optional as it might not change
  price: Joi.number().min(0).optional(), // Optional as it might not change
});

module.exports = {
  cartCreateSchema,
  cartUpdateSchema
};
