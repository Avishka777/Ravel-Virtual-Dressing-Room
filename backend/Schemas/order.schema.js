const Joi = require("joi");

const orderSchema = Joi.object({
  orderId: Joi.string(),
  itemCount: Joi.number().integer().min(1).positive().required(),
  totalAmount: Joi.number().positive().precision(2).required(),
  status: Joi.string().valid("Recieved", "Processing", "Completed").required(),
  userId: Joi.string().required(),
  itemId: Joi.string().required(),
});

module.exports = orderSchema;