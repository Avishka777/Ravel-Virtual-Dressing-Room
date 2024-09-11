const mongoose = require('mongoose');
const { Cart, Product } = require('../models')
const { cartSchema } = require('../Schemas')

const createCart = async (req, res) => {

    try {

        const { value, error } = cartSchema.cartCreateSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: "fail",
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
        }

        const { userId, productId, quantity, price, size, color } = value

        if (req.user.id !== userId) {
            return res.status(401).json({
                status: "fail",
                message: "You are not authorized to perform this action",
            })
        }

        const cart = new Cart({
            userId,
            productId,
            quantity,
            price,
            size,
            color
        })

        if(!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid product id",
            })
        }

        const product = await Cart.findOne({productId : productId});

        if (product) {
            return res.status(400).json({
                status: "fail",
                message: "Product already exists in the cart",
            })
        }

        await cart.save();

        res.status(201).json({
            status: "success",
            message: "Cart created successfully",
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

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
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

const productsByUserId = async (req, res) => {
    try {

        const { userId } = req.params;

        console.log("userId: ", userId);
        

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid user id",
            });
        }

        if (req.user.id !== userId) {
            return res.status(401).json({
                status: "fail",
                message: "You are not authorized to perform this action",
            });
        }



        // Fetch cart items and populate product details
        const cartItems = await Cart.find({ userId: userId }).populate({
            path: 'productId',
            select: 'name price thumbnailImage'
        });

        console.log("Cart Items: ", cartItems);
        

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No Cart Items",
            });
        }

        // Map the cart items to include necessary product details
        const cartDetails = cartItems.map(item => ({
            cartId: item._id,
            productId: item.productId._id,
            productName: item.productId.name,
            price: item.price,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            thumbnailImage: item.productId.thumbnailImage
        }));

        res.status(200).json({
            status: "success",
            message: "Cart retrieved successfully",
            data: cartDetails,
        });

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
        const { id } = req.params;  // Assuming 'id' is the cart ID

        // Validate cartId as a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid cart id.",
            });
        }

        // Validate the request body for allowed fields (quantity, price)
        const { value, error } = cartSchema.cartUpdateSchema.validate(req.body, { 
            allowUnknown: false, 
            stripUnknown: true 
        });

        if (error) {
            return res.status(400).json({
                status: "fail",
                error: error.details[0].message,
                message: "Your request cannot be processed. Please try again.",
            });
        }

        // Find and update the cart item by cart ID
        const cart = await Cart.findByIdAndUpdate(
            id,
            { $set: value },  // Update only the specified fields
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({
                status: "fail",
                message: "Cart not found.",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Cart updated successfully.",
            data: cart,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "fail",
            error: error.message,
            message: "Your request cannot be processed. Please try again.",
        });
    }
}

const deleteCart = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
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
    deleteCart,
    productsByUserId
}