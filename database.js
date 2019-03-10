var promise = require('bluebird')
var options = {
    promiseLib: promise,
}

var pgp = require('pg-promise')(options)
<<<<<<< HEAD
var conString = 'postgres://postgres:AchillesDying@104.248.9.4/quebec'
// var conString = 'postgres://postgres@localhost:5432/quebec'
=======
// var conString = 'postgres://postgres:Morto3d@0.tcp.ngrok.io:10709/quebec'
var conString = 'postgres://postgres:AchillesDying@104.248.9.4/quebec'
>>>>>>> 8014c1ddf320135e5ad7e99355e613bbb6e8dc40
var db = pgp(conString)

module.exports = db