const Joi = require("joi");

const addressSchema = Joi.object({
  houseNumber: Joi.string().min(2).max(50).required(),
  street: Joi.string().min(3).max(50).required(),
  city: Joi.string().min(3).max(50).required(),
  state: Joi.string().min(3).max(50).required(),
  postalCode: Joi.string()
    .length(5)
    .pattern(/^[0-9]+$/)
    .required(),
//   countryCode: Joi.string().min(2).max(50).required(),
});

module.exports = { addressSchema };
