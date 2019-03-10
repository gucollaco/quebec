const database = require('../../database')

class Tag {
    static insert(dados) {
        let query = `INSERT INTO tag (id_tag, descricao)
                    VALUES ('${dados.id_tag}', '${dados.descricao}')`

        return database.query(query)
    }

    static select(dados) {
        let query = `SELECT * from tag WHERE id_tag = ${dados.id_tag}`
        
        return database.query(query)
    }

    static delete(dados) {
        let query = `DELETE from tag WHERE id_tag = ${dados.id_tag}`
        
        return database.query(query)
    }
}

module.exports = Tag