const mongoose = require('mongoose');
const { getNextSequence } = require('../helpers');
const {Schema, model} = mongoose

const productImageSchema = new Schema({
    imageId: {
        type: String,
        unique: true,
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    imageType:{
        type: String,
    },
    imageurl:{
        type:String,
    },
    isActive:{
        type: Boolean,
        default: true
    }

},{timestamps: true})

productImageSchema.pre('save', async function(next){
    if(this.isNew){
        this.nextId = await getNextSequence('ProductImage')
        this.imageId = `PI${this.nextId}`
    }
    next()
})


module.exports = model('ProductImage', productImageSchema)