const mongoose = require('mongoose')
const { Category } = require('../models')
const {categorySchema} = require('../Schemas')


const createCategory = async (req, res) => {

    try {

        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized to perform this action'
            })
        }

        const { value, error } = categorySchema.validate(req.body)

        const { categoryId, name, isActive, description, subCategoryName } = value


        if (error) {
            return BadRequestError(error)
        }

        const category = new Category({
            categoryId,
            name,
            isActive,
            description,
            subCategoryName
        })

        if (!category) {
            return res.status(400).json({ status: 'fail', message: 'Category cannot create' });
        }

        await category.save()

        res.status(201).json({
            status: 'success',
            message: "Category created successfully",
            category
        })

    } catch (error) {
        console.log(error.message);
    }

}

const getAllCategory = async (req, res) => {

    try {

        const category = await Category.find()

        if (!category) {
            return res.status(404).json({ status:'fail',  message: 'Category cannot found' });
        }

        res.status(200).json({
            status:'success', 
            message: "Category found successfully",
            category
        })

    } catch (error) {
        console.log(error.message);
    }

}

const getCategoryById = async (req, res) => {


    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json(
                { 
                    status:'fail',  
                    message: 'Invaid Category Id' 
                }
            );

        }

        const category = await Category.findById(id)

        if (!category) {
            return res.status(404).json(
                { 
                    status:'fail',
                    message: 'Category cannot found' 
                }
            );
        }

        res.status(200).json({
            status:'success', 
            message: "Category found successfully",
            category
        })

    } catch (error) {
        console.log(error.message);
    }
}

const updateCategory = async (req, res) => {

    try {

        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized to perform this action'
            })
        }

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status:'fail', message: 'Invaid Category Id' });

        }

        const category = await Category.findByIdAndUpdate(id, req.body, { new: true })

        if (!category) {
            return res.status(404).json({status:'fail',  message: 'Category cannot found' });
        }

        res.status(200).json({
            status:'success', 
            message: "Category updated successfully",
            category
        })

    } catch (error) {
        console.log(error.message);
    }

}

const deleteCategory = async (req, res) => {

    try {

        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized to perform this action'
            })
        }

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
            .status(400)
            .json(
                { 
                    status:'fail', 
                    message: 'Invaid Category Id' 
                }
            );

        }

        const category = await Category.findByIdAndDelete(id)

        if (!category) {
            return res
            .status(404)
            .json(
                { 
                    status:'fail',
                    message: 'Category cannot found' 
                }
            );
        }

        res.status(200).json(
            {
                status:'success',
                message: "Category deleted successfully",
                category
            }
        )

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = { getAllCategory, createCategory, getCategoryById, updateCategory, deleteCategory }