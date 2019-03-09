const { Criterio } = require('../models')

class CriterioController {
    static async criar(dados) {
        if (!dados) throw new Error("Sem dados")

        await Criterio.insert(dados)
    }
    
    static async criar(dados) {
        if (!dados) throw new Error("Sem dados")

        await Criterio.insert(dados)
    } 
}

module.exports = CriterioController
