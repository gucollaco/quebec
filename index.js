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

global.SCORE = (() => {
    // recebe uma lista de criterios (cada criterio com NOTAS (direto do banco) e RESULTADO (o valor do criterio pelo colaborador))
    function evaluate(criterios){
      for(let criterio of criterios){
        let modelo = criterio.notas.modelo
        let resultado = criterio.resultado
  
        /*
          #1
          modelo: {
            peso: 1,
            intervalo: {
              tipo: discreto,
              valor: [0, 5]
            }
          }
          resultado: 3
  
          #2
          modelo: {
            peso: 2,
            lista: [{
              texto: Danificada,
              valor: -1
            }, {...}, ...]
          }
          resultado: [0, 3]

          #3
          modelo: {
            peso: 2,
            boleano: {
              texto: Pets,
              valor: true/false
            }
          }
          resultado: true
        */
  
        let normal;
        if(modelo.intervalo){
          normal = (resultado - modelo.intervalo.valor[0])/(modelo.intervalo.valor[1] - modelo.intervalo.valor[0])
        }else if(modelo.booleano){
          normal = +(resultado == modelo.booleano.valor) * modelo.booleano.peso
        }else if(modelo.lista){
          let soma = modelo.lista.filter((v, i) => {
              return i in resultado
          }).reduce((acc, cur) => {
              return acc + cur.valor
          }, 0)
          let lista_ordenada = modelo.lista.sort((a, b) => a.valor - b.valor)
          let len_lista = modelo.lista.length
  
          let minimo = lista_ordenada[0].valor
          let maximo = lista_ordenada[len_lista-1].valor
  
          normal = (soma - minimo) / (maximo - minimo)
        }
  
        criterio.normal = normal
        criterio.normal_ponderada = normal * modelo.peso     
      }
  
      let peso_total = criterios.reduce((acc, cur) => {
          return acc + cur.notas.peso
      }, 0)
      let nota_normal_ponderada_total = criterios.reduce((acc, cur) => acc + cur.normal_ponderada, 0)
  
      let nota_final = nota_normal_ponderada_total / peso_total
  
      return {
        final: nota_final,
        criterios: criterios.map(c => {
          return {
            resultado: c.resultado,
            normal: c.normal,
            peso: c.notas.peso,
            ponderada: c.ponderada
          }
        })
      }
    }
  
    return {evaluate}
  })()