const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const server = require('http').createServer(app);
require('dotenv').config();

const cors = require('cors');

var hbs = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        title: function () { return 'Quebec'; }
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const router = require('./routers/router')

app.use(cors());
app.use(express.static('public'));

app.use('/', express.static(__dirname + '/node_modules/onsenui'));

app.use('/', cors(), router);
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
