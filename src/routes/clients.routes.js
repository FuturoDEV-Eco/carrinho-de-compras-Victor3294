const {Router} = require("express")
const ClientController = require("../controllers/ClientController")

const clientsRouter = new Router()
const clienteControler = new ClientController()

clientsRouter.post("/", clienteControler.cadastrarCliente.bind(clienteControler))

module.exports = clientsRouter