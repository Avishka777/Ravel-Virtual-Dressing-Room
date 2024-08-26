const express = require('express');
const router = express.Router();
const { categoryController } = require('../../controllers')
const verifyUser = require('../../utils/verifyUser')

router.get('/', verifyUser, categoryController.getAllCategory);
router.get('/:id', verifyUser, categoryController.getCategoryById);
router.post('/', verifyUser, categoryController.createCategory);
router.patch('/:id', verifyUser, categoryController.updateCategory);
router.delete('/:id', verifyUser, categoryController.deleteCategory);

module.exports = router;