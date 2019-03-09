const database = require('../../database')

class Usuario {

    static getAll() {
        let query = `SELECT * FROM usuario`

        return database.query(query)
    }

    static insert(dados) {
        let query = `INSERT INTO usuario (id_usuario, perfil, credenciais, nome, foto, locais, data_hora)
                    VALUES (${dados.id_usuario}, (${dados.perfil}), '${JSON.stringify(dados.credenciais)}', ${dados.nome}, ${dados.foto}, ${dados.locais}, NOW())`

        let a
        try {
            a = database.query(query)
        }
        catch(err) {
            let b = err
        }
        return database.query(query)
    }
}

module.exports = Usuario