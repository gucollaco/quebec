const database = require('../../database')

class Imovel {

    static insert(dados) {
        let query = `INSERT INTO imovel
                    VALUES ('${dados.id_imovel}', '${dados.tipo}', ${dados.preco}, '${JSON.stringify(dados.localizacao)}', NOW(), '{${dados.tags}}')`

        return database.query(query)
    }

    static select(id) {
        let query = `SELECT *
                    FROM imovel
                    WHERE id_imovel = '${id}'`

        return database.query(query)
    }

    static selectFiltered(filtros) {
        let query = `SELECT *
                    FROM imovel`

        let c = 0;

        if (filtros.localização) {
            query += (c++ != 0) ? ` AND` : ` WHERE`
            query += ` (localizacao::jsonb->>'logradouro') LIKE '%${texto}%'
                    OR (localizacao::jsonb->>'complemento') LIKE '%${texto}%'
                    OR (localizacao::jsonb->>'bairro') LIKE '%${texto}%'
                    OR (localizacao::jsonb->>'cidade') LIKE '%${texto}%'
                    OR (localizacao::jsonb->>'estado') LIKE '%${texto}%'`
        }

        if (filtros.tags) {
            query += (c++ != 0) ? ` AND` : ` WHERE`
            query += ` ${tags} && tags`
        }
        
        return database.query(query)
    }

    // static selectByTag(tags_ids) {
    //     let query = `SELECT I.*
    //                 FROM imovel I
    //                 INNER JOIN tag T ON T.id_tag = ANY(I.tags) GROUP BY I.id_imovel
    //                 WHERE T.descricao = '${texto}'
    //                 GROUP BY I.id_imovel`
        
    //     return database.query(query)
    // }
        
    static addTag(dados) {
        let query = `UPDATE avaliacao
        SET tag = tag || '[${JSON.stringify(dados.id_tag)}]'
        WHERE id_avaliacao = '${dados.id}'`

        return database.query(query)
    }
}

module.exports = Imovel