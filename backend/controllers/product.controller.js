const mongoose = require('mongoose')
const { Product } = require('../models')
const { productSchema } = require('../Schemas')

const createProduct = async (req, res) => {
    try {
        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(401).json({
                status: "fail",
                message: "You are not authorized to perform this action"
            });
        }

        // Validate the request body against the Joi schema
        const { value, error } = productSchema.productSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: "fail",
                message: error.message
            });
        }

        // Destructure the validated data from the Joi schema
        const {
            category,
            color,
            size,
            price,
            thumbnailImage,
            image,
            name,
            description,
            stock,
            isActive
        } = value;

        // Create a new product instance with the validated data
        const product = new Product({
            category,
            color,
            size,
            price,
            thumbnailImage,
            image,
            name,
            description,
            stock,
            isActive
        });

        // Save the new product to the database
        const newProduct = await product.save();
        res.status(201).json({
            status: "success",
            message: "Product created successfully",
            data: newProduct
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: error.message,
            message: "Your request cannot be processed. Please try again",
        });
    }
};

const getProducts = async (req, res) => {

    try {

        const { name, category } = req.query;

        let query = {};

        // If 'name' is passed as an array (multiple names), handle it by joining the strings
        if (Array.isArray(name)) {
            // Use a regular expression to search for any of the provided names (case-insensitive)
            query.name = { $regex: name.join("|"), $options: 'i' }; // '|' acts as an OR operator in regex
        } else if (name) {
            // If only a single name is provided, use it in the query
            query.name = { $regex: name, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        const products = await Product.find(query).sort({ createdAt: -1 });

        if (products.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No products found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Products retrieved successfully",
            data: products
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

const getProductById = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: "fail",
                message: "No product found with the given id"
            })
        }

        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "No product found with the given id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Product retrieved successfully",
            data: product
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

const updateProduct = async (req, res) => {
    try {
        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(401).json({
                status: "fail",
                message: "You are not authorized to perform this action"
            });
        }

        const { id } = req.params;

        // Validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: "fail",
                message: "No product found with the given id"
            });
        }

        // Validate the request body against the Joi schema
        const { value, error } = productSchema.productUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: "fail",
                message: error.message
            });
        }

        // Update the product using validated data
        const product = await Product.findByIdAndUpdate(id, value, { new: true });

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "No product found with the given id"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: error.message,
            message: "Your request cannot be processed. Please try again",
        });
    }
};

const deleteProduct = async (req, res) => {
    try {

        if (!req.user.isAdmin) {
            return res.status(401).json({
                status: "fail",
                message: "You are not authorized to perform this action"
            })
        }

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: "fail",
                message: "No product found with the given id"
            })
        }

        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "No product found with the given id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Product deleted successfully",
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
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}