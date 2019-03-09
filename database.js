var promise = require('bluebird')
var options = {
    promiseLib: promise,
}

var pgp = require('pg-promise')(options)
var conString = 'postgres://postgres:AchillesDying@0.tcp.ngrok.io:12800/quebec'
var db = pgp(conString)

module.exports = db