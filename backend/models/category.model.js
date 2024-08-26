const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { getNextSequence } = require('../helpers');

const categorySchema = new Schema({
    categoryId: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 255
    },
    subCategoryName: {
        type: String,
        maxLength: 50,
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })


categorySchema.pre('save', async function (next) {
    if (this.isNew) {
        const nextId = await getNextSequence('Category');
        this.categoryId = `CTG${nextId}`;
    }
    next()
})

module.exports = model('Category', categorySchema);