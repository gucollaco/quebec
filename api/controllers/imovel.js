const { Imovel } = require('../models')
const AvaliacaoController = require('./avaliacao.js')

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
            imovel.score = (await AvaliacaoController.buscarPorImovel(imovel.id_imovel)).nota
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
            imovel.score = (await AvaliacaoController.buscarPorImovel(imovel.id_imovel)).nota
        })

        return { result }
    }

    static async buscaGeolocation(lat, lng, radius) {
        let imoveis = await Imovel.selectGeolocation(lat, lng, radius)

        let result = []
        for(let imovel of imoveis){
            let distancia = imovel.distancia
            imovel = (await Imovel.select(imovel.id_imovel))[0]
            imovel.distancia = distancia
            
            imovel.datahora = imovel.data_hora
            imovel.endereco = `${imovel.localizacao.logradouro} - ${imovel.localizacao.bairro}, ${imovel.localizacao.cidade} - ${imovel.localizacao.estado}`
            // imovel.nota = Math.random(0, 5)
            imovel.foto = imovel.links[0]

            result.push(imovel)
        }

        return result
    }

    static async adicionarTags(dados) {
        await Imovel.addTags(dados)
    }

    static async listarAvaliacoesAprovadas(id) {
        return await Imovel.selectApproved(id)
    }

    
}

module.exports = ImovelController
