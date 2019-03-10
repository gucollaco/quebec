const database = require('../../database')

class Imovel {

    static getAll(filters) {
        let query = `SELECT * FROM imovel`

        return database.query(query)
    }

    static insert(dados) {
        let query = `INSERT INTO imovel
                    VALUES ('${dados.id_imovel}', '${dados.tipo}', ${dados.preco}, '${dados.localizacao}', NOW())`

        return database.query(query)
    }

    static select(id) {
        let query = `SELECT *
                    FROM imovel
                    WHERE id_imovel = '${id}'`

        return database.query(query)
    }

    static addTags(dados) {
        let query = `UPDATE imovel SET tags = (select array_agg(distinct E) 
        FROM unnest(tags || '${dados.ids_tags}') E) 
        WHERE id_imovel = '${dados.id}';`
        
        return database.query(query)
    }

    static selectApproved(dados){
        let query = `SELECT * FROM avaliacao WHERE historico->jsonb_array_length(historico)-1->>'estado' = 'APROVADA' AND ${dados.id} = id_imovel`;
        return database.query(query)
    }

}

module.exports = Imovel