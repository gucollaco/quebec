const express = require('express');
const router = express.Router();

const ImovelController = require('../controllers/imovel');
const AvaliacaoController = require('../controllers/avaliacao');
const CriterioController = require('../controllers/criterio');

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

router.get('/', async (req, res, next) => {
    let result
    if(req.query.proximidade){
        result = await ImovelController.buscaGeolocation(req.query.lat, req.query.lng, 46)
    }else{
        result = (await ImovelController.buscaFiltrada(req.query)).result        
    }

    if(req.query.pontuacao){
        let criterios = await CriterioController.todos()
        let index = {}
        for(let criterio of criterios){
            index[criterio.id_criterio] = criterio
        }

        for(let imovel of result){
            let avaliacoes = await ImovelController.listarAvaliacoesAprovadas(imovel.id_imovel)

            for(let avaliacao of avaliacoes){
                let _criterios = avaliacao.criterios.map(c => {
                    return{
                        notas: index[c.id_criterio].notas,
                        resultado: c.nota,
                        ...c
                    }
                })
                avaliacao.pontuacao = AvaliacaoController.evaluate(_criterios)
            }

            imovel.avaliacoes = avaliacoes
            imovel.nota = avaliacoes.length == 0 ? undefined : avaliacoes.reduce((acc, cur) => acc + cur.pontuacao, 0) / avaliacoes.length
        }
    }

    res.json({ success: true, data: result })
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
