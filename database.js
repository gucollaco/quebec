var promise = require('bluebird')
var options = {
    promiseLib: promise,
}

var pgp = require('pg-promise')(options)
var conString = 'postgres://postgres:AchillesDying@104.248.9.4/quebec'
// var conString = 'postgres://postgres@localhost:5432/quebec'
var db = pgp(conString)

module.exports = db