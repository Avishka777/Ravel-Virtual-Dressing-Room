const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {getNextSequence} = require('../helpers')

const productSchema = new Schema({

    productId: {
        type: String,
        unique: true,
    },

    categoryId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category',
        required: true
    },

    thumbnailImage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProductImage',
    },

    image: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProductImage',
    },

    name:{
        type: String,
        required: true,
        maxLength: [50, 'Name must be at most 50 characters long']
    },

    price:{
        type: Number,
        required: true,
        min: [100, 'Price must be at least 100'],
        max: [1000000, 'Price must be at most 1000000']
    },

    description:{
        type: String,
        required: true,
        maxLength: [500, 'Description must be at most 500 characters long']
    },
    
    isActive:{
        type: Boolean,
        default: true
    }

}, {timestamps: true})

productSchema.pre('save', async function(next) {
    if (this.isNew) {
        const nextId = await getNextSequence('Product')
        this.productId = `PROD${nextId}`
    }
    next()
}) 

module.exports = model('Product', productSchema);