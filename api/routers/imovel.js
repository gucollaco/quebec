const express = require('express');
const router = express.Router();

const ImovelController = require('../controllers/imovel');

router.get('/:id', (req, res, next) => {
    ImovelController.get(req.params.id).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})

module.exports = router;
