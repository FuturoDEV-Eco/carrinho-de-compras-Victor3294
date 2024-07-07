const Database = require("../database/connection")

class OrderController extends Database {
    async cadastrarPedido (request, response) {
        try {
            const dados = request.body
            if(!dados.address || !dados.client_id){
                return response.status(400).json({mensagem: "O total, endereço e o id do cliente são dados obrigatorios"})
            }
            let total = 0;
            for(let i = 0; i < dados.products.length; i++){
                const item = dados.products[i]
                const produtoAtual = await this.database.query("Select price from products where id = $1", [item.product_id])
                total = total + (produtoAtual.rows[0].price * item.amount);
            }
            
            const pedido = await this.database.query(`Insert into orders 
                (total, address, observations, client_id)
                values ($1, $2, $3, $4) returning *`, [total, dados.address, dados.observations, dados.client_id])

            dados.products.forEach( async produto => {
                const precoAtual = await this.database.query("Select price from products where id = $1", [produto.product_id])
                this.database.query(`Insert into order_items
                    (price, amount, order_id, product_id)
                    values ($1, $2, $3, $4)`, [precoAtual.rows[0].price, produto.amount, pedido.rows[0].id, produto.product_id])
            });
            response.status(201).json({mensagem: "carrinho cadastrado com sucesso!"})
        } catch (error) {
            console.log(error)
            response.status(500).json({mensagem: "Não foi possivel cadastrar o pedido"})
        }
    }
}

module.exports = OrderController