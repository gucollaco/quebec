const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuario');


router.post('/', (req, res, next) => {
    UsuarioController.criar(req.body).then(dados => {
        res.json({ success: true })

    }).catch(next)
})

router.get('/:id', (req, res, next) => {
    UsuarioController.buscar(req.params.id).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

// put, delete usam body tambem

router.get('/exemplo', (req, res, next) => {
    UsuarioController.exemplo(req.query).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

module.exports = router;
