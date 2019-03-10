const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuario');

router.get('/:id', (req, res, next) => {
    UsuarioController.buscar(req.params.id).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

router.get('/pendente', (req, res, next) => {
    UsuarioController.buscarPendentes().then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

router.put('/:id/aprovar', (req, res, next) => {
    UsuarioController.aprovar(req.params.id).then(() => {
        res.json({ success: true })
    }).catch(next)
})

module.exports = router;
