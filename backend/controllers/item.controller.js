const mongoose = require("mongoose");

const { Item } = require("../models");
const { itemSchema } = require("../Schemas");



const createItem = async (req, res) => {
    try {
        const { value, error } = itemSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 'fail', message: error.message })
        }

        const { itemCount, isActive } = value;

        const item = await Item.create({
            itemCount,
            isActive,
        });

        if (!item) {
            return res.status(400).json({ status: 'fail', message: "Item cannot create" });
        }

        res.status(201).json({ status: 'success', data: item, message: "Item created successfully" });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err.message,
            message: "Your request cannot be processed. Please try again",
        });
    }
};

const getAllItems = async (req, res) => {
    try {
        const item = await Item.find();

        if (!item) {
            return res.status(404).json({ status: 'fail', message: "Item not found" });
        }
        res
            .status(200)
            .json({ status: 'success', data: item, message: "Items found successfully" });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err.message,
            message: "Your request cannot be processed. Please try again",
        });
    }
};

const getItemById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 'fail', message: "Invalid Item id" });
        }

        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({ status: 'fail', message: "Item not found" });
        }

        res
            .status(200)
            .json({ status: 'success', data: item, message: "Item found successfully" });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err.message,
            message: "Your request cannot be processed. Please try again",
        });
    }
};


const updateItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 'fail', message: "Invalid item id" });
        }

        const { value, error } = itemSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const updatedItem = await Item.findByIdAndUpdate(id, value, {
            new: true,
        });

        if (!updatedItem) {
            return res.status(404).json({  status: 'fail', message: "Item not found" });
        }

        res.status(200).json({
            status: 'success',
            data: updatedItem,
            message: "Item updated successfully",
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err.message,
            message: "Your request cannot be processed. Please try again",
        });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({  status: 'fail', message: "Invalid item id" });
        }

        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({  status: 'fail', message: "Item not found" });
        }

        res.status(200).json({  status: 'success', message: "Item deleted successfully" });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            error: err.message,
            message: "Your request cannot be processed. Please try again",
        });
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
};
