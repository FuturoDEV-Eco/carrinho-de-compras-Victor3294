const Database = require("../database/connection")

class ProductController extends Database {
    async cadastrarProduto(request, response) {
        try {
            const dados = request.body
            if(!dados.name || !dados.amount || !dados.color || !dados.voltage || !dados.description || !dados.category_id || !dados.price){
                return response.status(400).json({mensagem: "O nome, a quantidade, a cor, a voltagem, a descrição, o preço e o id da categoria são dados obrigatorios"})
            }
            const produto = await this.database.query(`insert into products 
                (name, amount, color, voltage, description, category_id, price)
                values ($1, $2, $3, $4, $5, $6, $7) returning *`, [dados.name, dados.amount, dados.color, dados.voltage, dados.description, dados.category_id, dados.price])
            response.status(201).json(produto.rows[0])
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel cadastrar o produto"})
        }
    }

    async listarTodosProdutos(request, response) {
        try {
            const produtos = await this.database.query(`Select * from products`)
            response.status(200).json(produtos.rows)
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel realizar a busca"})
        }
    }

    async listarUmProduto(request, response) {
        try {
            const id = request.params.id
            const produto = await this.database.query(`select products.name, products.amount, products.color, products.voltage, products.description, products.price, categories.name_category  from products join categories on products.category_id = categories.id where products.id = $1`, [id])
            if(produto.rows.length === 0) {
                response.status(404).json({mensagem: "Não foi possive encontrar um produto com o id enviado"})
            }
            response.json(produto.rows[0])
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel realizar a busca"})
        }
    }
}

module.exports = ProductController