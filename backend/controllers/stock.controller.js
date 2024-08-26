const mongoose = require('mongoose')
const { Stock } = require('../models')
const { stockSchema } = require('../Schemas')


const createStock = async (req, res) => {
    try {

        if (!req.user.isAdmin) {
            return res.status(401).json({ message: "You are not authorized to perform this action" })
        }

        const { value, error } = stockSchema.validate(req.body)

        if (error) {
            return res.status(400).json({ message: error.message })
        }

        const { stockId, productId, sizeId, colorId, stockCount } = value

        const stock = new Stock({
            stockId,
            productId,
            sizeId,
            colorId,
            stockCount
        })

        if (!stock) {
            return res.status(400).json({
                status: 'fail',
                message: 'Stock cannot be created',
            });
        }

        await stock.save()

        res.status(201).json({
            status: 'success',
            message: 'Stock created successfully',
            data: stock,
        })

    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}

const getAllStock = async (req, res) => {
    try {

        if (!req.user.isAdmin) {
            return res.status(401).json({ message: "You are not authorized to perform this action" })
        }

        const stock = await Stock.find()

        if (!stock) {
            return res.status(400).json({
                status: 'fail',
                message: 'Stock cannot be found',
            });

        }

        res.status(200).json({
            status: 'success',
            message: 'Stock found successfully',
            data: stock,
        })

    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}

const getStockById = async (req, res) => {
    try {

        
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: "You are not authorized to perform this action" })
        }
        
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ status: 'fail', message: 'Invalid size ID' })
        }

        const stock = await Stock.findById(id)

        if (!stock) {
            return res.status(404).json({
                status: 'fail',
                message: 'Stock cannot be found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Stock found successfully',
            data: stock,
        })

    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}

const updateStock = async (req, res) => {
    try {

        if (!req.user.isAdmin) {
            return res.status(401).json({ message: "You are not authorized to perform this action" })
        }
        
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ status: 'fail', message: 'Invalid size ID' })
        }

        const stock = await Stock.findByIdAndUpdate(id, req.body, { new: true })

        if (!stock) {
            return res.status(404).json({
                status: 'fail',
                message: 'Stock cannot be found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Stock updated successfully',
            data: stock,
        })


    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}

const deleteStock = async (req, res) => {
    try {

        if (!req.user.isAdmin) {
            return res.status(401).json({ message: "You are not authorized to perform this action" })
        }
        
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ status: 'fail', message: 'Invalid size ID' })
        }

        const stock = await Stock.findByIdAndDelete(id)

        if (!stock) {
            return res.status(404).json({
                status: 'fail',
                message: 'Stock cannot be found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Stock deleted successfully',
        })

    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}

module.exports = {
    createStock,
    getAllStock,
    getStockById,
    updateStock,
    deleteStock
}

