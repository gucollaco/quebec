const database = require('../../database')

class Criterio {
    static insert(dados) {
        let query = `INSERT INTO criterio (id_criterio, nome, descricao, notas, data_hora)
                    VALUES ('${dados.id_criterio}', '${dados.nome}', '${dados.descricao}', '${JSON.stringify(dados.notas)}', NOW())`

        return database.query(query)
    }

    static select(dados) {
        let query = `SELECT * from criterio WHERE id_criterio = '${dados.id}'`
        
        return database.query(query)
    }

    static select_all() {
        let query = `SELECT * from criterio`
        
        return database.query(query)
    }
}

module.exports = Criterio