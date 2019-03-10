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
        return await Avaliacao.getByImovel(id)
    }
}

module.exports = AvaliacaoController
