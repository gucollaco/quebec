const database = require('../../database')

class Avaliacao {

    static getAll() {
        let query = `SELECT * FROM avaliacao`

        return database.query(query)
    }

    static insert(dados) {
        let query = `INSERT INTO avaliacao
                    VALUES ('${dados.id_avaliacao}', NOW(), '${JSON.stringify(dados.criterios)}', '${JSON.stringify(dados.historico)}', ${dados.id_imovel}, '${dados.id_usuario}')`

        return database.query(query)
    }

    static update(dados) {
        let query = `UPDATE avaliacao
                    SET historico = historico || '[${JSON.stringify(dados.atualizacao)}]'
                    WHERE id_avaliacao = '${dados.id}'`

        return database.query(query)
    }

    static select(id) {
        let query = `SELECT *
                    FROM avaliacao
                    WHERE id_avaliacao = '${id}'`

        return database.query(query)
    }
}

module.exports = Avaliacao