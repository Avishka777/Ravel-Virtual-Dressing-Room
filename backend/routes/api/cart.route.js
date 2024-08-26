const express = require('express');
const router = express.Router();
const { cartController } = require('../../controllers')
const verifyUser = require('../../utils/verifyUser')

router.get('/', verifyUser, cartController.getAllFromCart);
router.get('/:id', verifyUser, cartController.getOneFromCart);
router.post('/', verifyUser, cartController.createCart);
router.patch('/:id', verifyUser, cartController.updateCart);
router.delete('/:id', verifyUser, cartController.deleteCart);

module.exports = router;