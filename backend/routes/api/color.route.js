const express = require('express');
const router = express.Router();
const verifyUser = require('../../utils/verifyUser')
const { colorController } = require('../../controllers')

router.get('/', verifyUser, colorController.getAllColors);
router.get('/:id', verifyUser, colorController.getColorById);
router.post('/', verifyUser, colorController.createColor);
router.patch('/:id', verifyUser, colorController.updateColor);
router.delete('/:id', verifyUser, colorController.deleteColor); 



module.exports = router;