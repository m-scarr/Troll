var controller = require('../controllers/gameController.js')
//var axios = require('axios');

module.exports = function (app, passport) {

    app.get('/chapter', controller.chapter);

    app.post('/choose', isLoggedIn, controller.choose);

}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
}
function isntLoggedIn(req, res, next) {
    if (!req.isAuthenticated())
        return next();
}