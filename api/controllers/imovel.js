const { Imovel, Avaliacao } = require('../models')

class ImovelController {
    static async criar(dados) {
        await Imovel.insert(dados)
    }

    static async buscar(id) {
        let result = await Imovel.select(id)

        for (let imovel of result) {
            imovel.datahora = imovel.data_hora
            imovel.endereco = `${imovel.localizacao.logradouro} - ${imovel.localizacao.bairro}, ${imovel.localizacao.cidade} - ${imovel.localizacao.estado}`
            imovel.nota = Math.random(0, 5)
            imovel.foto = imovel.links[0]
            let r = await this.buscarPorImovel(imovel.id_imovel)
            imovel.score = r.nota
        }

        return { result }
    }

    static async buscaFiltrada(filtros) {
        let result = await Imovel.selectFiltered(filtros)

        for (let imovel of result) {
            imovel.datahora = imovel.data_hora
            imovel.endereco = `${imovel.localizacao.logradouro} - ${imovel.localizacao.bairro}, ${imovel.localizacao.cidade} - ${imovel.localizacao.estado}`
            imovel.nota = Math.random(0, 5)
            imovel.foto = imovel.links[0]
            let r = await this.buscarPorImovel(imovel.id_imovel)
            imovel.score = r.nota
        }

        return { result }
    }

    static async buscarPorImovel(id) {
        let result = await Avaliacao.getByImovel(id)

        var aval = 0;
        for (let av of result) {
            aval += global.SCORE.evaluate(av.criterios).final
        }

        aval /= result.length
        
        result = { ...result[0], nota: aval }

        return result
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
