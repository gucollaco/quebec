const database = require('../../database')

class Usuario {

    static getAll() {
        let query = `SELECT * FROM usuario`

        return database.query(query)
    }

    static insert(dados) {
        let query = `INSERT INTO usuario
                    VALUES ('${dados.id_usuario}', '{${dados.perfil}}', '${JSON.stringify(dados.credenciais)}', '${dados.nome}', '${dados.foto}', '{${dados.locais}}', NOW())`

        return database.query(query)
    }

    static select(id) {
        let query = `SELECT *
                    FROM usuario
                    WHERE id_usuario = '${id}'`

        return database.query(query)
    }
}

module.exports = Usuario