const database = require('../../database')
const crypto = require('crypto')

class Usuario {

    static getAll() {
        let query = `SELECT * FROM usuario`

        return database.query(query)
    }

    static insert(dados) {
        var id = crypto.randomBytes(7).toString('hex');
        let query = `INSERT INTO usuario
                    VALUES ('${id}', '{${dados.perfil}}', '${JSON.stringify(dados.credenciais)}', '${dados.nome}', '', '{${dados.locais}}', NOW())`

        return database.query(query)
    }

    static select(id) {
        let query = `SELECT *
                    FROM usuario
                    WHERE id_usuario = '${id}'`

        return database.query(query)
    }

    static selectByCredenciais(credenciais) {
        let query = `SELECT *
                    FROM usuario
                    WHERE credenciais->>'usuario' = '${credenciais.usuario}'
                    AND credenciais->>'senha' = '${credenciais.senha}'`

        return database.query(query)
    }
}

module.exports = Usuario