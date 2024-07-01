const {Router} = require("express")
const ProductController = require("../controllers/ProductController")

const productsRouter = new Router()
const productController = new ProductController()

productsRouter.post('/', productController.cadastrarProduto.bind(productController))
productsRouter.get('/', productController.listarTodosProdutos.bind(productController))

module.exports = productsRouter