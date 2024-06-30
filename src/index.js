const express = require("express")
const clientsRouter = require("./routes/clients.routes")
const productsRouter = require("./routes/products.routes")

const app = express()
app.use(express.json())
app.use('/clients', clientsRouter)
app.use('/products', productsRouter)

app.listen(3000, () => {
    console.log("Servidor Online")
})