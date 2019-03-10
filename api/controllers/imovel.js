const { Imovel } = require('../models')

class ImovelController {
    static async criar(dados) {
        await Imovel.insert(dados)
    }

    static async buscar(id) {
        return await Imovel.select(id)
    }

    static async adicionarTag(dados) {
        await Imovel.addTag(dados)
    }

    
}

module.exports = ImovelController
