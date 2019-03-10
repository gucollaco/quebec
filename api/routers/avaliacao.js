const express = require('express');
const router = express.Router();

const AvaliacaoController = require('../controllers/avaliacao');

router.post('/', (req, res, next) => {
    AvaliacaoController.criar(req.body).then(dados => {
        res.json({ success: true })

    }).catch(next)
})

router.put('/:id', (req, res, next) => {
    AvaliacaoController.alterar({ id: req.params.id, ...req.body }).then(dados => {
        res.json({ success: true })
    }).catch(next)
})

router.get('/:id/imovel', (req, res, next) => {
    AvaliacaoController.buscarPorImovel(req.params.id).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

router.get('/:id', (req, res, next) => {
    AvaliacaoController.buscar(req.params.id).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

module.exports = router;
