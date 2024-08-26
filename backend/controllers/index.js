const userController = require('./user.controller')
const categoryController = require('./category.controller');
const sizeController = require('./size.controller')
const colorController = require('./color.controller')
const productController = require('./product.controller')
const stockController = require('./stock.controller')
const orderController = require('./order.controller')
const itemController = require('./item.controller')
const cartController = require('./cart.controller')

module.exports = {
    userController,
    categoryController,
    sizeController,
    colorController,
    productController,
    stockController,
    orderController,
    itemController,
    cartController
}