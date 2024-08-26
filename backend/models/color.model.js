const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { getNextSequence } = require('../helpers');

const colorSchema = new Schema({

    colorId: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true })

colorSchema.pre('save', async function (next) {
    if (this.isNew) {
        const nextId = await getNextSequence('Color');
        this.colorId = `color_${nextId}`;
    }
    next()
})


module.exports = model('Color', colorSchema);