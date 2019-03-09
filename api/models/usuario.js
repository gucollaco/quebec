const database = require('../../database')

class Usuario {

    static getAll() {
        let query = `SELECT * FROM usuario`

        return database.query(query)
    }

    static insert(dados) {
        let query = `INSERT INTO usuario (id_usuario, perfil, credenciais, nome, foto, locais, data_hora)
                    VALUES (${dados})`

        return database.query(query)
    }
}

module.exports = Usuario