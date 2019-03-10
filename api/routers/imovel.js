const express = require('express');
const router = express.Router();

const ImovelController = require('../controllers/imovel');

router.post('/', (req, res, next) => {
    ImovelController.criar(req.body).then(dados => {
        res.json({ success: true })
    }).catch(next)
})

router.get('/:id', (req, res, next) => {

    ImovelController.buscar(req.params.id).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

router.get('/', (req, res, next) => {
    ImovelController.buscaFiltrada(req.query).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

router.put('/:id', (req, res, next) => {
    AvaliacaoController.alterar({ id: req.params.id, ...req.body }).then(dados => {
        res.json({ success: true })
    }).catch(next)
})

module.exports = router;
