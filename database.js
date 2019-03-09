var promise = require('bluebird')
var options = {
    promiseLib: promise,
}

var pgp = require('pg-promise')(options)
var conString = 'postgres://postgres:Morto3d@0.tcp.ngrok.io:15583/quebec'
var db = pgp(conString)

module.exports = db