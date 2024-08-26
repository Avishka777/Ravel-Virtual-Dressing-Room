const mongoose = require('mongoose');
const { Schema, model } = mongoose

const addressModel = new Schema(
    {
        houseNumber: {
            type: String,
            maxLength: 50,
            minLength: 2,
        },
        street: {
            type: String,
            maxLength: 50,
            minLength: 3,
        },
        city: {
            type: String,
            maxLength: 50,
            minLength: 3,
        },
        state: {
            type: String,
            maxLength: 50,
            minLength: 3,
        },
        postalCode: {
            type: Number,
            maxLength: 5,
            minLength: 5,
        },
    },
    { _id: false }
)

module.exports = {addressModel};