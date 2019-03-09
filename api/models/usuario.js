const database = require('../../database')

class Usuario {

    static getAll() {
        let query = `SELECT * FROM usuario`

        return database.query(query)
    }
}

module.exports = Usuario