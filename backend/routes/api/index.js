const router = require('express').Router();

const userRoutes = require('./user.route')
const productRoutes = require('./product.route')
const orderRoutes = require('./order.route')
const cartRoutes = require('./cart.route')
const chatbotRoute = require('./chatbot.route')


//user routes
router.use('/user', userRoutes)

//product routes
router.use('/product', productRoutes)

//order routes
router.use('/order', orderRoutes)

//item routes
router.use('/cart', cartRoutes)

//chatbot route
router.use('/chat-bot',chatbotRoute)


module.exports = router;