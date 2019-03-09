const database = require('../../database')

class Criterio {
    static insert(dados) {
        let query = `INSERT INTO criterio (id_criterio, descricao, notas, data_hora)
                    VALUES (${dados.id_criterio}, ${dados.descricao}, '${JSON.stringify(dados.notas)}', NOW())`

        return database.query(query)
    }

    static select(dados) {
        let query = `SELECT * from criterio WHERE id_criterio = ${dados.id}`
        
        return database.query(query)
    }
}

module.exports = Criterio