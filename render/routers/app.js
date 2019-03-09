const express = require('express');
const router = express.Router();

const AppController = require('../controllers/app');

router.use('/', (req, res) => {
    res.render('home', {
        head: {
            onsenui: true
        }
    })
})

module.exports = router;
