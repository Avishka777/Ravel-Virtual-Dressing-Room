const joi = require('joi');
const {regExp} = require('../constants');
const {addressSchema} = require('./address.schema')

const userRegisterSchema = joi.object({
    name: joi.string().required().min(2).max(255),
    email: joi.string().required().email(),
    address: joi.string(),
    phone: joi.number().integer().required(),
    password: joi.string().required().min(8).max(100).regex(regExp.password)
})

const userLoginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8).max(100)
})

const userUpdateSchema = joi.object({
    name: joi.string().min(2).max(255).optional(),
    email: joi.string().email(),
    address: addressSchema.optional(),
    phone: joi.number().integer(),
    password: joi.string().min(8).max(100).regex(regExp.password)
})

module.exports = {
    userRegisterSchema,
    userLoginSchema,
    userUpdateSchema
}