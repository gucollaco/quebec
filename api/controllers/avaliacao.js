const { Avaliacao, Criterio } = require('../models')
const dateTime = require('date-time');

class AvaliacaoController {
    static async criar(dados) {
        let data = new Date()
        dados.historico[0].data_hora = dateTime()
        await Avaliacao.insert(dados)
    }

    static async aprovar(dados) {
        let data = new Date()
        dados.data_hora = dateTime()
        dados.estado = 'APROVADA'
        await Avaliacao.update(dados)
    }

    static async reprovar(dados) {
        let data = new Date()
        dados.data_hora = dateTime()
        dados.estado = 'REPROVADA'
        await Avaliacao.update(dados)
    }

    static async buscar(id) {
        return await Avaliacao.select(id)
    }

    static async buscarPorImovel(id) {
        let result = await Avaliacao.getByImovel(id)

        result = result.map(av => {
            return {
                criterios: av.criterios,
                status: av.historico[av.historico.length-1].estado
            }
        })

        var aval = 0;
        for (let av of result) {
            for(let a of av.criterios) {
                let [modelo] = await Criterio.select(a.id_criterio)
                modelo = modelo.notas.modelo
                a.notas = modelo,
                a.resultado = a.nota
            }
            aval += global.SCORE.evaluate(av.criterios)
            let a = 'oi'
        }

        aval /= result.length
        
        result.nota = aval

        return result
    }}

module.exports = AvaliacaoController

