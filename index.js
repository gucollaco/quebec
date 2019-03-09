const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const server = require('http').createServer(app);
require('dotenv').config();

const cors = require('cors');
const routerAPI = require('./api/routers')
const routerRender = require('./render/routers')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());
app.use('/api', cors(), routerAPI);
app.use('/', cors(), routerRender);
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
