const express = require('express');
const router = express.Router();
const verifyUser = require('../../utils/verifyUser')
const { orderController } = require('../../controllers')

router.get('/', verifyUser, orderController.getAllOrders);
router.get('/:id', verifyUser, orderController.getOrderById);
router.post('/', verifyUser, orderController.createOrder);
router.patch('/:id', verifyUser, orderController.updateOrder);
router.delete('/:id', verifyUser, orderController.deleteOrder); 



module.exports = router;