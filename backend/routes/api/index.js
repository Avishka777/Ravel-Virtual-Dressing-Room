const router = require('express').Router();

const userRoutes = require('./user.route')
const categoryRoutes = require('./category.route')
const sizeroutes = require('./size.route')
const colorRoutes = require('./color.route')
const productRoutes = require('./product.route')
const stockRoutes = require('./stock.route')
const orderRoutes = require('./order.route')
const itemRoutes = require('./item.route')
const cartRoutes = require('./cart.route')

//user routes
router.use('/user', userRoutes)

//category routes
router.use('/category', categoryRoutes)

//size routes
router.use('/size', sizeroutes)

//color routes
router.use('/color', colorRoutes)

//product routes
router.use('/product', productRoutes)

//stock routes
router.use('/stock', stockRoutes)

//order routes
router.use('/order', orderRoutes)

//item routes
router.use('/item', itemRoutes)

//item routes
router.use('/cart', cartRoutes)

module.exports = router;