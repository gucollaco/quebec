var promise = require('bluebird')
var options = {
    promiseLib: promise,
}

var pgp = require('pg-promise')(options)
// var conString = 'postgres://postgres:Morto3d@0.tcp.ngrok.io:10709/quebec'
var conString = 'postgres://postgres:AchillesDying@104.248.9.4/quebec'
var db = pgp(conString)

module.exports = db