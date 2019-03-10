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
                let [modelo] = await Criterio.select({ id: a.id_criterio })
                a.nome = modelo.nome
                modelo = modelo.notas.modelo
                a.notas = modelo,
                a.resultado = a.nota
            }
            aval += global.SCORE.evaluate(av.criterios).final
            let a = 'oi'
        }

        aval /= result.length
        
        result = { ...result[0], nota: aval }

        result.criterios.forEach(item => {
            item.descricao = item.observacao
        })

        return result
    }

    static evaluate(criterios) {
        for(let criterio of criterios){
        let modelo = criterio.notas
        let resultado = criterio.resultado
    
        /*
            #1
            modelo: {
            peso: 1,
            intervalo: {
                tipo: discreto,
                valor: [0, 5]
            }
            }
            resultado: 3
    
            #2
            modelo: {
            peso: 2,
            lista: [{
                texto: Danificada,
                valor: -1
            }, {...}, ...]
            }
            resultado: [0, 3]
        */
    
        let normal;
        if(modelo.intervalo){
            normal = (resultado - modelo.valor[0])/(modelo.valor[1] - modelo.valor[0])
        }else if(modelo.boleano){
            normal = +(resultado == modelo.valor) * modelo.peso
        }else if(modelo.lista){
            let soma = modelo.lista.filter((v, i) => i in resultado).reduce((acc, cur) => acc + cur.valor, 0)
            let lista_ordenada = modelo.lista.sort((a, b) => a.valor - b.valor)
            let len_lista = modelo.lista.length
    
            let minimo = lista_ordenada[0].valor + lista_ordenada[1].valor
            let maximo = lista_ordenada[len_lista-1].valor + lista_ordenada[len_lista-2].valor
    
            normal = (soma - minimo) / (maximo - minimo)
        }
    
        criterio.normal = normal
        criterio.normal_ponderada = normal * modelo.peso     
        }
    
        let peso_total = criterios.reduce((acc, cur) => acc + cur.modelo.peso, 0)
        let nota_normal_ponderada_total = criterios.reduce((acc, cur), acc + cur.normal_ponderada, 0)
    
        let nota_final = nota_normal_ponderada_total / peso_total
    
        return {
            final: nota_final,
            criterios: criterios.map(c => {
                return {
                resultado: c.resultado,
                normal: c.normal,
                peso: c.modelo.peso,
                ponderada: c.ponderada
                }
            })
        }
    }
}

module.exports = AvaliacaoController

