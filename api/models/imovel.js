const database = require('../../database')

class Imovel {

    static insert(dados) {
        let query = `INSERT INTO imovel
                    VALUES ('${dados.id_imovel}', '${dados.tipo}', ${dados.preco}, '${JSON.stringify(dados.localizacao)}', NOW(), '{${dados.tags}}'
                    , '${dados.banheiros}', '${dados.quartos}', '${dados.suites}', '${dados.area}', '${dados.titulo}', '${dados.descricao}', '${dados.estacionamento}', '{${dados.links}}', '(${dados.latitude},${dados.longitude})')`

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
        FROM unnest(tags || '{${dados.ids_tags}}') E) 
        WHERE id_imovel = '${dados.id}';`
        
        return database.query(query)
    }
    static selectFiltered(filtros) {
        let query = `SELECT *
                    FROM imovel`

        let c = 0;

        if (filtros.localizacao) {
            query += (c++ != 0) ? ` AND` : ` WHERE`
            query += ` ((localizacao::jsonb->>'logradouro') LIKE '%${filtros.localizacao}%'
                    OR (localizacao::jsonb->>'complemento') LIKE '%${filtros.localizacao}%'
                    OR (localizacao::jsonb->>'bairro') LIKE '%${filtros.localizacao}%'
                    OR (localizacao::jsonb->>'cidade') LIKE '%${filtros.localizacao}%'
                    OR (localizacao::jsonb->>'estado') LIKE '%${filtros.localizacao}%')`
        }

        if (filtros.tags) {
            query += (c++ != 0) ? ` AND` : ` WHERE`
            query += ` ARRAY${filtros.tags} && tags`
        }

        if (filtros.preco) {
            query += (c++ != 0) ? ` AND` : ` WHERE`
            let preco = JSON.parse(filtros.preco)
            query += ` preco BETWEEN ${preco[0]} AND ${preco[1]}`
        }

        if (filtros.tipo) {
            query += (c++ != 0) ? ` AND` : ` WHERE`
            query += ` tipo = '${filtros.tipo}'`
        }
        
        return database.query(query)
    }
    static selectTop(){
        let query = `
        SELECT * FROM 
        `
    }

    // static selectByTag(tags_ids) {
    //     let query = `SELECT I.*
    //                 FROM imovel I
    //                 INNER JOIN tag T ON T.id_tag = ANY(I.tags) GROUP BY I.id_imovel
    //                 WHERE T.descricao = '${texto}'
    //                 GROUP BY I.id_imovel`
        
    //     return database.query(query)
    // }

    static selectApproved(id){
        let query = `SELECT * FROM avaliacao WHERE historico->jsonb_array_length(historico)-1->>'estado' = 'APROVADA' AND '${id}' = id_imovel`;
        return database.query(query)
    }

}

module.exports = Imovel