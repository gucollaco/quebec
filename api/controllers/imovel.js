const { Imovel } = require('../models')

class ImovelController {
    static async criar(dados) {
        await Imovel.insert(dados)
    }

    static async buscar(id) {
        return await Imovel.select(id)
    }

    static async buscaFiltrada(filtros) {
        // datahora: '10/03/2019 02:30',
        // endereco: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
        // nota: 5.0,
        // foto: 'https://www.ligadoemviagem.com.br/wp-content/uploads/2018/09/masp-museu-artes-sao-paulo-19.jpg'

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
