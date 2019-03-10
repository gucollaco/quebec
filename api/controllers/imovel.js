const { Imovel } = require('../models')

class ImovelController {
    static async criar(dados) {
        await Imovel.insert(dados)
    }

    static async buscar(id) {
        return await Imovel.select(id)
    }

    static async buscaFiltrada(filtros) {
        return await Imovel.selectFiltered(filtros)
    }

    static async adicionarTags(dados) {
        await Imovel.addTags(dados)
    }

    static async listarAvaliacoesAprovadas(dados) {
        await Imovel.selectApproved(dados)
    }

    
}

module.exports = ImovelController
