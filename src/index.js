const express = require("express")
const clientsRouter = require("./routes/clients.routes")

const app = express()
app.use(express.json())
app.use('/clients', clientsRouter)

app.listen(3000, () => {
    console.log("Servidor Online")
})