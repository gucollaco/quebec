const express = require('express');

const app = express();
const server = require('http').createServer(app);
require('dotenv').config();

const cors = require('cors');
const router = require('./routers/router')

app.use(cors());
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
