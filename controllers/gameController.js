var axios = require('axios')
var db = require('../models')
var chapters = require(`../controllers/TrollsToll.js`)

var exports = module.exports = {}


exports.chapter = function (req, res) {
    if (req.user === undefined) {
        res.render('chapter', {})
    } else {
        db.user.findOne({ where: { id: req.user.id } }).then(data => {
            // res.send(chapters[req.query.c])
            // console.log(chapters[data.dataValues.chapter])
            res.render('chapter', chapters[data.dataValues.chapter])
        })
    }

}

exports.choose = function (req, res) {
    db.user.update({
        chapter: req.query.c
      }, {
        where: { id: req.user.id },
      })
      .then(function (result) {
        res.send()
      });
}

