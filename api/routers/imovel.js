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
    ImovelController.buscaFiltrada(req.query).then(result => {
        res.json({ success: true, data: result })
    }).catch(next)
})

router.put('/:id/tags', (req, res, next) => {
    ImovelController.adicionarTags({ id: req.params.id, ...req.body }).then(dados => {
        res.json({ success: true })
    }).catch(next)
})

router.get('/:id/avaliacoes', (req, res, next) => {
    ImovelController.listarAvaliacoesAprovadas(req.params.id).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

module.exports = router;
