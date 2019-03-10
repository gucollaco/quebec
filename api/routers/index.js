const express = require('express');
const router = express.Router();

const usuarioRouter = require('./usuario')
const imovelRouter = require('./imovel')
const avaliacaoRouter = require('./avaliacao')
const criterioRouter = require('./criterio')
const tagRouter = require('./tag')

router.use('/usuario', usuarioRouter);
router.use('/imovel', imovelRouter);
router.use('/avaliacao', avaliacaoRouter);
router.use('/criterio', criterioRouter);
router.use('/tag', tagRouter);
module.exports = router;
