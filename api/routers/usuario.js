const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuario');

router.get('/:id', (req, res, next) => {
    UsuarioController.buscar(req.params.id).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

module.exports = router;
