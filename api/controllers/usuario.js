const { Usuario } = require('../models')

class UsuarioController {

    static async exemplo({ id }) {
        if (!id) throw new Error("Sem id")

        return await Usuario.getAll()
    }

    static async criarUsuario(dados) {
        if (!dados) throw new Error("Sem dados")

        await Usuario.insert(dados)
    }
}

module.exports = UsuarioController
