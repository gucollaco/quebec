const { Avaliacao } = require('../models')
const dateTime = require('date-time');

class AvaliacaoController {
    static async criar(dados) {
        let data = new Date()
        dados.historico[0].data_hora = dateTime()
        await Avaliacao.insert(dados)
    }

    static async alterar(dados) {
        let data = new Date()
        dados.atualizacao.data_hora = dateTime()
        await Avaliacao.update(dados)
    }

    static async buscar(id) {
        return await Avaliacao.select(id)
    }

    static async buscarPorImovel(id) {
        let result = await Avaliacao.getByImovel(id)

        result.map(av => {
            av.status = av.historico[av.historico.length-1].estado
            av.nota = 0
        })

        return result
    }}

module.exports = AvaliacaoController
