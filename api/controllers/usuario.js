const { Usuario } = require('../models')

class UsuarioController {

    static async criar(dados) {
        await Usuario.insert(dados)
    }

    static async buscar(id) {
        return await Usuario.select(id)
    }
}

module.exports = UsuarioController
