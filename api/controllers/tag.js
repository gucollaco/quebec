const { Tag } = require('../models')

class TagController {

    static async criar(dados) {
        if (!dados) throw new Error("Sem dados")

        await Tag.insert(dados)
    }

    static async buscar(dados) {
        if (!dados) throw new Error("Sem dados")

        return await Tag.select(dados)
    }

    static async excluir(id) {
        if (!id) throw new Error("Sem dados")

        await Tag.delete(dados)
    }
}

module.exports = TagController