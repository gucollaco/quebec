var promise = require('bluebird')
var options = {
    promiseLib: promise,
}

var pgp = require('pg-promise')(options)
var conString = 'postgres://postgres:Morto3d@0.tcp.ngrok.io:11407/quebec'
// var conString = 'postgres://postgres@localhost:5432/quebec'
var db = pgp(conString)

module.exports = db