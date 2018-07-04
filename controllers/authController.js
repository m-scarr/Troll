var db = require('../models')

var exports = module.exports = {}

exports.register = function (req, res) {
    res.render(`register`, {})
}

exports.login = function (req, res) {
    res.render(`login`, {})
}

exports.checkAvailability = function (req, res) {
    db.user.count({ where: { email: req.query.email } }).then(count => {
        console.log(count)
        res.json(count)
    })
}

exports.logout = function (req, res) {
    req.logout()
    req.session.destroy(function (err) {
        res.send()
    });
}
