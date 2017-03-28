/**
 * Created by Olejka on 02.03.2017.
 */

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_URI,{
    server: {
        socketOptions: {
            socketTimeoutMS: 0,
            connectTimeout: 0
        }
    }
});

module.exports = mongoose;