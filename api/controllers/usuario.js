const { Usuario } = require('../models')

class UsuarioController {

    static async create(dados) {
        await Usuario.insert(dados)
    }

    static async get(id) {
        await Usuario.select(id)
    }
}

module.exports = UsuarioController
