const { Tag } = require('../models')

class TagController {

    static async criar(dados) {
        if (!dados) throw new Error("Sem dados")

        await Tag.insert(dados)
    }

    static async criar(dados) {
        if (!dados) throw new Error("Sem dados")

        return await Tag.insert(dados)
    }
}

module.exports = TagController