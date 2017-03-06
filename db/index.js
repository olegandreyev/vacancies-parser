/**
 * Created by Olejka on 02.03.2017.
 */

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);

module.exports = mongoose;