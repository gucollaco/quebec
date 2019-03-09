const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuario');

router.post('/', (req, res, next) => {
    UsuarioController.criarUsuario(req.body).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

router.get('/exemplo', (req, res, next) => {
    UsuarioController.exemplo(req.query).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

module.exports = router;
