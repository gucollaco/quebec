const express = require('express');
const router = express.Router();

const usuarioRouter = require('./usuario')
const imovelRouter = require('./imovel')
const avaliacaoRouter = require('./avaliacao')
const categoriaRouter = require('./categoria')

router.use('/usuario', usuarioRouter)
router.use('/imovel', imovelRouter)
router.use('/avaliacao', avaliacaoRouter)
router.use('/categoria', categoriaRouter)


router.use('/', require('./app'))

module.exports = router;
