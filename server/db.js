/**
 * Created by Olejka on 02.03.2017.
 */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/aggregator');

module.exports = mongoose;