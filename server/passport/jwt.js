/**
 * Created by Olejka on 13.03.2017.
 */

const ExtractJwt = require('passport-jwt').ExtractJwt,
      JWTStrategy = require('passport-jwt').Strategy,
      User = require('../../models/user');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload._id, function(err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

module.exports = jwtLogin;