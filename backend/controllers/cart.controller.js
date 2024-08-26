const mongoose = require('mongoose');
const { Cart } = require('../models')
const { cartSchema } = require('../Schemas')

const createCart = async (req, res) => {

    try {

        const { value, error } = cartSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: "fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
        }

        const { cartId, status, orderId } = value

        const cart = new Cart({
            cartId,
            status,
            orderId
        })

        await cart.save();

        res.status(201).json({
            status: "success",
            message: "Cart created successfully",
            data: cart,
        })

    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                status: "fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}


const getAllFromCart = async (req, res) => {

    try {

        const carts = await Cart.find();

        res.status(200).json({
            status: "success",
            message: "Carts retrieved successfully",
            data: carts,
        })

    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                status: "fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}


const getOneFromCart = async (req, res) => {

    try {

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: "fail",
                message: "Invalid cart id",
            })
        }

        const cart = await Cart.findById(id);

        if (!cart) {
            return res.status(404).json({
                status: "fail",
                message: "Cart not found",
            })
        }

        res.status(200).json({
            status: "success",
            message: "Cart retrieved successfully",
            data: cart,
        })

    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                status: "fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}


const updateCart = async (req, res) => {

    try {

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: "fail",
                message: "Invalid cart id",
            })
        }

        const { value, error } = cartSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: "fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
        }

        const cart = await Cart.findByIdAndUpdate(id, value, {new: true}); 
        
        if (!cart) {
            return res.status(404).json({
                status: "fail",
                message: "Cart not found",
            })
        }

        res.status(200).json({
            status: "success",
            message: "Cart updated successfully",
            data: cart,
        })

    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                status: "fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}


const deleteCart = async (req, res) => {

    try {

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: "fail",
                message: "Invalid cart id",
            })
        }

        const cart = await Cart.findByIdAndDelete(id);

        if (!cart) {
            return res.status(404).json({
                status: "fail",
                message: "Cart not found",
            })
        }

        res.status(200).json({
            status: "success",
            message: "Cart deleted successfully",
        })




    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                status: "fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}

module.exports = {
    createCart,
    getAllFromCart,
    getOneFromCart,
    updateCart,
    deleteCart
}