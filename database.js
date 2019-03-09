var promise = require('bluebird')
var options = {
    promiseLib: promise,
}

var pgp = require('pg-promise')(options)
var conString = 'postgres://postgres:AchillesDying@localhost:5432/quebec'
var db = pgp(conString)

module.exports = db