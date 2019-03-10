const express = require('express');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
const server = require('http').createServer(app);
require('dotenv').config();

const cors = require('cors');

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        title: () => 'Quebec'
    }
}));
app.set('views', path.join(__dirname, 'render/views'));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());

app.use(express.static('public'));
app.use('/onsenui', express.static(__dirname + '/node_modules/onsenui'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));
app.use('/bootstrap-select', express.static(__dirname + '/node_modules/bootstrap-select'));

const UsuarioController = require('./api/controllers/usuario')
app.post('/api/usuario', (req, res, next) => {
    UsuarioController.criar(req.body).then(() => {
        res.json({ success: true })
    }).catch(next)
})
app.post('/api/usuario/login', (req, res, next) => {
    UsuarioController.login(req.body).then(dados => {
        res.json({ success: true, data: dados })
    }).catch(next)
})
// app.use(async (req, res, next) => {
//     if (!req.headers.authorization) {
//         let e = new Error("O usuário não possui permissão para executar essa ação.")
//         next(e)
//     }
//     else {
//         let token = req.headers.authorization.split(' ')[1]
//         jwt.verify(token, '53nh4', function(err, decoded){
//             if(err){
//                 next(err)
//             }
//             next()
//         })
//     }
// })
app.use('/api', cors(), require('./api/routers'));
app.use('/', cors(), require('./render/routers'));
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        success: false,
        error: {
            status: error.status || 500,
            name: error.name || 'ErrorName',
            message: error.message || 'No message.'
        }
    })
})

const port = process.env.PORT || 4001;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
