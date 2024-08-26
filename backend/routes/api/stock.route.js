const express = require('express');
const router = express.Router();
const verifyUser = require('../../utils/verifyUser')
const { stockController } = require('../../controllers')

router.get('/', verifyUser, stockController.getAllStock);
router.get('/:id', verifyUser, stockController.getStockById);
router.post('/', verifyUser, stockController.createStock);
router.patch('/:id', verifyUser, stockController.updateStock);
router.delete('/:id', verifyUser, stockController.deleteStock);

module.exports = router;