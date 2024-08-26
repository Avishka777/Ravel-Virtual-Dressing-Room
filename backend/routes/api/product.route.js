const express = require('express');
const router = express.Router();
const verifyUser = require('../../utils/verifyUser')
const { productController } = require('../../controllers')

router.get('/', verifyUser, productController.getProducts);
router.get('/:id', verifyUser, productController.getProductById);
router.post('/', verifyUser, productController.createProduct);
router.patch('/:id', verifyUser, productController.updateProduct);
router.delete('/:id', verifyUser, productController.deleteProduct);

module.exports = router;