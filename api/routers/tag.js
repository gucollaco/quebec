const express = require('express');
const router = express.Router();

const TagController = require('../controllers/tag');


router.post('/', (req, res, next) => {
    TagController.criar(req.body).then(dados => {
        res.json({ success: true })

    }).catch(next)
})

router.get('/', (req, res, next) => {
    TagController.buscarTodos(req.params).then(dados => {
        res.json({ success: true, data:dados })
    }).catch(next)
})

router.get('/:id', (req, res, next) => {
    TagController.buscar(req.params).then(dados => {
        res.json({ success: true, data:dados })
    }).catch(next)
})

router.delete('/:id', (req, res, next) => {
    TagController.excluir(req.params.id).then(dados => {
        res.json({ success: true })
    }).catch(next)
})

module.exports = router;