const Database = require("../database/connection")

class ClientController extends Database {
    async cadastrarCliente (request,response) {
        try {
            const dados = request.body
            if(!dados.name || !dados.email || !dados.cpf || !dados.contact){
                return response.status(400).json({mensagem: "O nome, o email, o cpf e o contato são obrigatorios"})
            }
            await this.database.query(`
                Insert into clients (name, email, cpf, contact) 
                values ($1, $2, $3, $4)
                `, [dados.name, dados.email, dados.cpf, dados.contact])
                response.status(201).json({mensagem: "Cliente cadastrado com sucesso"})
        } catch (error) {
            console.log(error)
            response.status(500).json({mensagem: "Não foi possivel cadastrar o cliente"})
        }

    }
}

module.exports = ClientController