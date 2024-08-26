const mongoose = require('mongoose')
const { Size } = require('../models')
const { sizeSchema } = require('../Schemas')


const createSize = async (req, res) => {

    try {

        if (!req.user.isAdmin) return res.satus(401).json({ status: 'fail', message: "You are not authorized to perform this action" })
        
        const {value, error} = sizeSchema.validate(req.body)

        if (error) return res.status(400).json({ status: 'fail', message: error.message })

        const { sizeId, name, code, isActive} = value

        const codeExists = await Size.findOne({ code })
        if (codeExists) return res.status(400).json({ status: 'fail', message: 'Size code already exists' })

        const size = new Size({

            sizeId,
            name,
            code,
            isActive,

        })

        if (!size) {
            return res.status(400).json({
                status: 'fail',
                message: 'Size cannot be created',
            });
        }

        await size.save();

        res.status(201).json({
            status: 'success',
            message: 'Size created successfully',
            size,
        });


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

const getAllSizes = async (req, res) => {

    try {

        const sizes = await Size.find();

        if (!sizes) {
            return res.status(404).json({
                status: 'fail',
                message: 'Sizes not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Sizes retrieved successfully',
            sizes,
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

const getSizeById = async (req, res) => {

    try {

        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ status: 'fail', message: 'Invalid size ID' })
        
        const size = await Size.findById(id);

        if(!size) return res.status(404).json({status: "fail", message: "Size not found"})

        res.status(200).json({
            status: 'success',
            message: 'Size retrieved successfully',
            size,
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

const updateSize = async (req, res) => {

    try {

        if(!req.user.isAdmin) return res.status(401).json({ status: 'fail', message: "You are not authorized to perform this action" })

        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ status: 'fail', message: 'Invalid size ID' })

        const size = await Size.findByIdAndUpdate(id, req.body, { new: true });

        if(!size) return res.status(404).json({status: "fail", message: "Size not found"})
        
        res.status(200).json({
            status: 'success',
            message: 'Size updated successfully',
            size,
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

const deleteSize = async (req, res) => {
    try {

        if(!req.user.isAdmin) return res.status(401).json({ status: 'fail', message: "You are not authorized to perform this action" })

        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ status: 'fail', message: 'Invalid size ID' })
        
        const size = await Size.findByIdAndDelete(id);

        if(!size) return res.status(404).json({status: "fail", message: "Size not found"})

        res.status(200).json({
            status: 'success',
            message: 'Size deleted successfully',
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
    createSize,
    getAllSizes,
    getSizeById,
    updateSize,
    deleteSize
}