const mongoose = require('mongoose')
const { Color } = require('../models')
const { colorSchema } = require('../Schemas')

const createColor = async (req, res) => {
    try {

        if (!req.user.isAdmin) return res.satus(401).json({ status: 'fail', message: "You are not authorized to perform this action" })

        const { value, error } = colorSchema.validate(req.body)

        if (error) return res.status(400).json({ status: 'fail', message: error.message })

        const { colorId, name, code, isActive } = value

        const codeExists = await Color.findOne({ code })
        if (codeExists) return res.status(400).json({ status: 'fail', message: 'Color code already exists' })

        const color = new Color({

            colorId,
            name,
            code,
            isActive,

        })

        if (!color) {
            return res.status(400).json({
                status: 'fail',
                message: 'Color cannot be created',
            });
        }

        await color.save();

        res.status(201).json({
            status: 'success',
            message: 'Color created successfully',
            color,
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

const getAllColors = async (req, res) => {
    try {

        const color = await Color.find();

        if (!color) {
            return res.status(404).json({
                status: 'fail',
                message: 'Color not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Color retrieved successfully',
            color,
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

const getColorById = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ status: 'fail', message: 'Invalid color ID' })

        const color = await Color.findById(id);

        if (!color) return res.status(404).json({ status: "fail", message: "Color not found" })

        res.status(200).json({
            status: 'success',
            message: 'Color retrieved successfully',
            color,
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

const updateColor = async (req, res) => {
    try {

        if (!req.user.isAdmin) return res.status(401).json({ status: 'fail', message: "You are not authorized to perform this action" })

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ status: 'fail', message: 'Invalid Color ID' })

        const color = await Color.findByIdAndUpdate(id, req.body, { new: true });

        if (!color) return res.status(404).json({ status: "fail", message: "Color not found" })

        res.status(200).json({
            status: 'success',
            message: 'Color updated successfully',
            color,
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

const deleteColor = async (req, res) => {
    try {

        if (!req.user.isAdmin) return res.status(401).json({ status: 'fail', message: "You are not authorized to perform this action" })

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ status: 'fail', message: 'Invalid Color ID' })

        const color = await Color.findByIdAndDelete(id);

        if (!color) return res.status(404).json({ status: "fail", message: "Color not found" })

        res.status(200).json({
            status: 'success',
            message: 'Color deleted successfully',
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
    createColor,
    getAllColors,
    getColorById,
    updateColor,
    deleteColor
}