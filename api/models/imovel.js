const database = require('../../database')

class Imovel {

    static getAll(filters) {
        let query = `SELECT * FROM imovel`

        return database.query(query)
    }

    static insert(dados) {
        let query = `INSERT INTO imovel
                    VALUES ('${dados.id_imovel}', '${dados.tipo}', ${dados.preco}, '${JSON.stringify(dados.localizacao)}', NOW())`

        return database.query(query)
    }

    static select(id) {
        let query = `SELECT *
                    FROM imovel
                    WHERE id_imovel = '${id}'`

        return database.query(query)
    }

    static selectByLocalizacao(texto) {
        let query = `SELECT *
                    FROM imovel
                    WHERE (localizacao::jsonb->>'logradouro') LIKE '%${texto}%'
                    OR (localizacao::jsonb->>'complemento') LIKE '%${texto}%'
                    OR (localizacao::jsonb->>'bairro') LIKE '%${texto}%'
                    OR (localizacao::jsonb->>'cidade') LIKE '%${texto}%'
                    OR (localizacao::jsonb->>'estado') LIKE '%${texto}%'`
        
        return database.query(query)
    }
}

module.exports = Imovel