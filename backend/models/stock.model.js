const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { getNextSequence } = require('../helpers');

const stockSchema = new Schema({
    stockId: {
        type: String,
        unique: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    sizeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Size',
        required: true
    },
    colorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
        required: true
    },
    stockCount: {
        type: Number,
    }

}, { timestamps: true })

stockSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.nextId = await getNextSequence('Stock');
        this.stockId = `STK-${this.nextId}`;
    }
})


module.exports = model('Stock', stockSchema);