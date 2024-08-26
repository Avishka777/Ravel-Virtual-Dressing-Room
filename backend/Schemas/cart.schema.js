const Joi = require("joi");

  const cartSchema = Joi.object({
    cartId: Joi.string(),
    status: Joi.string().valid("Recieved", "Processing", "Completed").required(),
    orderId: Joi.string().required(),
  });


module.exports =  cartSchema