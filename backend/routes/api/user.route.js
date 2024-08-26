const express = require("express");
const router = express.Router();
const {userController} = require('../../controllers')
const verifyUser = require('../../utils/verifyUser')

router.post('/', userController.createUser)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

router.patch('/:id', verifyUser, userController.updateUser)
router.delete('/:id', verifyUser, userController.deleteUser)

router.get('/' , verifyUser, userController.getAllUsers)
router.get('/:id' , verifyUser, userController.getUserById)

module.exports = router;