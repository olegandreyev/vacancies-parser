const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/authentication');
const passportService = require('../passport');
const passport = require('passport');

const requireLogin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

const apiRoutes = require('./api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Registration route
router.post('/register', AuthMiddleware.register);

//Check email on existing
router.post('/isUniqueEmail',AuthMiddleware.inUniqueEmail);

// Login route
router.post('/auth', requireLogin, AuthMiddleware.isEmailVerified, AuthMiddleware.login);

//confirm email route
router.get("/confirmEmail", AuthMiddleware.confirmEmail);

//forgot password route
router.post('/forgot', AuthMiddleware.forgotPassword);

//reset password route
router.post("/resetPassword", AuthMiddleware.resetPassword);


// Set url for API group routes
router.use('/api', requireAuth, apiRoutes);




module.exports = router;
