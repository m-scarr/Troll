var controller = require('../controllers/authController.js');

module.exports = function (app, passport) {

    app.get('/register', controller.register);

    app.get('/login', controller.login);

    app.get('/logout', controller.logout);

    app.get('/checkAvailability', controller.checkAvailability)

    app.post('/register', isntLoggedIn, passport.authenticate('local-register', {
        successRedirect: '!',
        failureRedirect: 'X'
    }
    ));

    app.post('/login', isntLoggedIn, passport.authenticate('local-login', {
        successRedirect: '/chapter',
        failureFlash: 'X'
    }
    ));
    

    app.get('/isntLoggedIn', isntLoggedIn, function (req, res) {
        res.send('true')
    })

    app.get('/isLoggedIn', isLoggedIn, function (req, res) {
        res.send('true')
    })
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
}
function isntLoggedIn(req, res, next) {
    if (!req.isAuthenticated())
        return next();
}