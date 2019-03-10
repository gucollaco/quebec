const { Imovel } = require('../models')

class ImovelController {
    static async criar(dados) {
        await Imovel.insert(dados)
    }

    static async buscar(id) {
        let result = await Imovel.select(id)

        result.map(imovel => {
            imovel.datahora = imovel.data_hora
            imovel.endereco = `${imovel.localizacao.logradouro} - ${imovel.localizacao.bairro}, ${imovel.localizacao.cidade} - ${imovel.localizacao.estado}`
            imovel.nota = Math.random(0, 5)
            imovel.foto = imovel.links[0]
        })

        return { result }
    }

    static async buscaFiltrada(filtros) {
        let result = await Imovel.selectFiltered(filtros)

        result.map(imovel => {
            imovel.datahora = imovel.data_hora
            imovel.endereco = `${imovel.localizacao.logradouro} - ${imovel.localizacao.bairro}, ${imovel.localizacao.cidade} - ${imovel.localizacao.estado}`
            imovel.nota = Math.random(0, 5)
            imovel.foto = imovel.links[0]
        })

        return { result }
    }

    static async adicionarTags(dados) {
        await Imovel.addTags(dados)
    }

    static async listarAvaliacoesAprovadas(id) {
        return await Imovel.selectApproved(id)
    }

    
}

module.exports = ImovelController
