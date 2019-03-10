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

    static async buscarTodos() {

        return await Tag.selectAll()
    }

    static async excluir(id) {
        if (!id) throw new Error("Sem dados")

        await Tag.delete(id)
    }
}

module.exports = TagController