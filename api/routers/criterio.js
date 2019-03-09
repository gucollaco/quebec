const express = require('express');
const router = express.Router();

const CriterioController = require('../controllers/criterio');

router.post('/', (req, res, next) => {
    CriterioController.criar(req.body).then(dados => {
        res.json({ success: true })
    }).catch(next)
})

router.get('/:id', (req, res, next) => {
    CriterioController.buscar(req.params).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

module.exports = router;
