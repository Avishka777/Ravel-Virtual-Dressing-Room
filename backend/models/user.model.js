const mongoose = require('mongoose');
const { Schema, model } = mongoose

const { addressModel } = require('./address.model')
const { regExp } = require('../constants')
const {getNextSequence} = require('../helpers')

const userSchema = new Schema({
    userId: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: regExp.email,
    },
    address: {
        type: String,
        required: true,
       
    },
    phone: {
        type: Number,
        maxLength: 12,
        minLength: 10,
        required: true,
        match: regExp.phone,
    },
    password: {
        type: String,
        maxLength: 100,
        minLength: 8,
        match: regExp.password,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (this.isNew) {
      const nextId = await getNextSequence("User");
      this.userId = `USR${nextId}`;
    }
    next();
  });

module.exports = model('User', userSchema)