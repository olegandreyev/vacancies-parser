/**
 * Created by Olejka on 13.03.2017.
 */

const User = require('../../models/user'),
      LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    email = email.toLowerCase();
    User.findOne({ email: email }, function(err, user) {
        if(err) { return done(err); }
        if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

            return done(null, user);
        });
    });
});

module.exports = localLogin;