const express = require('express');
const router = express.Router();

const AppController = require('../controllers/app');
const UsuarioController = require('../../api/controllers/usuario')

const jwt = require('jsonwebtoken')

router.use('/', (req, res) => {
    res.render('home', {
        head: {
            onsenui: true
        },
    })
})

module.exports = router;
