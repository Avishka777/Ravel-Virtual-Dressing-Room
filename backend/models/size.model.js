const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { getNextSequence } = require('../helpers');

const sizeSchema = new Schema({

    sizeId: {
        type: String,
        unique: true,
    },
    name:{
        type: String,
    },
    code:{
        type: String
    },
    isActive:{
        type: Boolean,
        default: true
    },  

    
}, {timestamps: true})

sizeSchema.pre('save', async function (next) {
    if(this.isNew){
        const nextId = await getNextSequence('Size')
        this.sizeId = `size_${nextId}`
    }
})

module.exports = model('Size', sizeSchema);