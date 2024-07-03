const {Router} = require("express")
const OrderController = require("../controllers/OrderController")

const orderRouter = new Router()
const orderController = new OrderController()
orderRouter.post('/', orderController.cadastrarPedido.bind(orderController))

module.exports = orderRouter