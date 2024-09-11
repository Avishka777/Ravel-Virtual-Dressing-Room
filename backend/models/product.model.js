const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { getNextSequence } = require('../helpers')

const productSchema = new Schema({

    productId: {
        type: String,
        unique: true,
    },

    category: {
        type: String,
        required: true,
    },

    color: [{
        type: String,
    }],

    size: [{
        type: String,
    }],

    price: {
        type: Number,
    },

    stock: {
        type: Number,
    },

    thumbnailImage: {
        type: String,
        default: 'https://cloud-atg.moph.go.th/quality/sites/default/files/default_images/default.png',
    },

    image: [{
        type: String,
    }],

    name: {
        type: String,
        required: true,
        maxLength: [50, 'Name must be at most 50 characters long']
    },

    description: {
        type: String,
        maxLength: [500, 'Description must be at most 500 characters long']
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

productSchema.pre('save', async function (next) {
    if (this.isNew) {
        const nextId = await getNextSequence('Product')
        this.productId = `PROD${nextId}`
    }
    next()
})

module.exports = model('Product', productSchema);