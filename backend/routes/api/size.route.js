const express = require('express');
const router = express.Router();
const verifyUser = require('../../utils/verifyUser')
const { sizeController } = require('../../controllers')

router.get('/', verifyUser, sizeController.getAllSizes);
router.get('/:id', verifyUser, sizeController.getSizeById);
router.post('/', verifyUser, sizeController.createSize);
router.patch('/:id', verifyUser, sizeController.updateSize);
router.delete('/:id', verifyUser, sizeController.deleteSize);



module.exports = router;