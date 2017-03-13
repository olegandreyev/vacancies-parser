/**
 * Created by Olejka on 13.03.2017.
 */

const passport = require('passport');
const jwtLogin = require('./jwt');
const localLogin = require('./local');

passport.use(localLogin);
passport.use(jwtLogin);


