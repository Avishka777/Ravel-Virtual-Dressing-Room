const mongoose = require('mongoose')
const { Product } = require('../models')
const { productSchema } = require('../Schemas')

const createProduct = async (req, res) => {

    try {

        if(!req.user.isAdmin) {
            return res.status(401).json({
                status:"fail",
                message: "You are not authorized to perform this action"
            })
        }

        const {value, error} = productSchema.validate(req.body)

        if(error) {
            return res.status(400).json({
                status:"fail",
                message: error.message
            })
        }

        const {        
            categoryId,
            // thumbnailImage,
            // image,
            name,
            price,
            description
        } = value

        const product = await Product.create({            
            categoryId,
            // thumbnailImage,
            // image,
            name,
            price,
            description
        })

        const newProduct =  await product.save()
        res.status(201).json({
            status:"success",
            message: "Product created successfully",
            data: newProduct
        })
        
    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                status:"fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
    
}

const getProducts = async (req, res) => {

    try {

        const products =  await Product.find()

        if(!products) {
            return res.status(404).json({
                status:"fail",
                message: "No products found"
            })
        }

        res.status(200).json({
            status:"success",
            message: "Products retrieved successfully",
            data: products
        })
        
    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                status:"fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
    
}

const  getProductById = async (req, res) => {
    try {

        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status:"fail",
                message: "No product found with the given id"
            })
        }

        const product = await Product.findById(id)

        if(!product) {
            return res.status(404).json({
                status:"fail",
                message: "No product found with the given id"
            })
        }

        res.status(200).json({
            status:"success",
            message: "Product retrieved successfully",
            data: product
        })
        
    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                status:"fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}

const updateProduct = async (req, res) => {
    try {

        if(!req.user.isAdmin) {
            return res.status(401).json({
                status:"fail",
                message: "You are not authorized to perform this action"
            })
        }

        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status:"fail",
                message: "No product found with the given id"
            })
        }

        const product = await Product.findByIdAndUpdate(id, req.body, {new: true})

        if(!product) {
            return res.status(404).json({
                status:"fail",
                message: "No product found with the given id"
            })
        }

        res.status(200).json({
            status:"success",
            message: "Product updated successfully",
            data: product
        })
        
    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                status:"fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}

const deleteProduct = async (req, res) => {
    try {

        if(!req.user.isAdmin) {
            return res.status(401).json({
                status:"fail",
                message: "You are not authorized to perform this action"
            })
        }

        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status:"fail",
                message: "No product found with the given id"
            })
        }

        const product = await Product.findByIdAndDelete(id)

        if(!product) {
            return res.status(404).json({
                status:"fail",
                message: "No product found with the given id"
            })
        }

        res.status(200).json({
            status:"success",
            message: "Product deleted successfully",
        })
        
    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                status:"fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}