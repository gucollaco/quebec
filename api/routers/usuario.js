const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuario');

router.get('/exemplo', (req, res, next) => {
    UsuarioController.exemplo(req.query).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

module.exports = router;
