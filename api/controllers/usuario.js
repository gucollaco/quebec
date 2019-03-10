const { Usuario } = require('../models')
var jwt = require('jsonwebtoken');

class UsuarioController {

    static async criar(dados) {
        await Usuario.insert(dados)
    }

    static async buscar(id) {
        return await Usuario.select(id)
    }

    static async buscarPendentes(id) {
        return await Usuario.selectPending(id)
    }

    static async aprovar(id) {
        await Usuario.approve(id)
    }

    static async login(dados) {
        let [user] = await Usuario.selectByCredenciais(dados.credenciais)

        if (!user) throw new Error("Credenciais inválidas.")
        else {
            let token = jwt.sign({ user }, '53nh4')
            return { token }
        }
    }
}

module.exports = UsuarioController
