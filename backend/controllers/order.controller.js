const mongoose = require('mongoose')
const { Order } = require('../models')
const { orderSchema } = require('../Schemas')

const createOrder = async (req, res) => {
    try {

        if(req.user.id !== req.body.userId){
            return res.status(400).json({
                status: "fail",
                message: "You need to login for this action"
            })
        }

        const { value, error } = orderSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }

        const { itemCount, totalAmount, status, userId, itemId } = value;

        const order = await Order.create({
            itemCount,
            totalAmount,
            status,
            userId,
            itemId,
        });

        if (!order) {
            return res.status(400).json({
                status: 'fail',
                message: 'Order cannot be created'
            })
        }
        await order.save()

        res.status(201).json({
            status: 'success',
            message: 'Order created successfully',
            data: order,
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

const getAllOrders = async (req, res) => {

    try {

        if (!req.user.isAdmin) {
            return res.status(400).json({
                status: "fail",
                message: "You are not authorized to perform this action"
            })
        }

        const orders = await Order.find()

        if (!orders) {
            return res.status(404).json({
                status: "fail",
                message: "No orders found"
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Orders retrieved successfully',
            data: orders,
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

const getOrderById = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid order id"
            })
        }

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found"
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Order retrieved successfully',
            data: order,
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

const updateOrder = async (req, res) => {
    try {

        if (!req.user.isAdmin) {
            return res.status(400).json({
                status: "fail",
                message: "You are not authorized to perform this action"
            })
        }

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid order id"
            })
        }

        const { value,  error } = orderSchema.validate(req.body)
        
        if (error) {
            return res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, value, { new: true }) 

        if (!updatedOrder) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found"
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Order updated successfully',
            data: updatedOrder,
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

const deleteOrder = async (req, res) => {
    try {

        if (!req.user.isAdmin) {
            return res.status(400).json({
                status: "fail",
                message: "You are not authorized to perform this action"
            })
        }

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid order id"
            })
        }

        const deletedOrder = await Order.findByIdAndDelete(id)

        if (!deletedOrder) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found"
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Order deleted successfully',
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
    createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder
}