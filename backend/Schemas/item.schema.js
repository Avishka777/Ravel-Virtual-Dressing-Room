const Joi = require("joi");

  const itemSchema = Joi.object({
    itemId: Joi.string(),
    itemCount: Joi.number().integer().min(1).required(),
    isActive: Joi.boolean(),
  });


module.exports = itemSchema