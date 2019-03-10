const database = require('../../database')

class Imovel {

    static getAll(filters) {
        let query = `SELECT * FROM imovel`

        return database.query(query)
    }

    static insert(dados) {
        let query = `INSERT INTO imovel
                    VALUES ('${dados.id_imovel}', '${dados.tipo}', ${dados.preco}, '${dados.localizacao}', NOW())`

        return database.query(query)
    }

    static select(id) {
        let query = `SELECT *
                    FROM imovel
                    WHERE id_imovel = '${id}'`

        return database.query(query)
    }
}

module.exports = Imovel