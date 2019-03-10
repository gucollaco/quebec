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

const port = process.env.PORT || 4002;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
