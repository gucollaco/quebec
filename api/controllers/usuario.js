const { Usuario } = require('../models')

class UsuarioController {
    static async exemplo({ id }) {
        if (!id) throw new Error("Sem id")

        return Usuario.getAll()
    }
}

module.exports = UsuarioController
