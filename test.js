/**
 * Created by Olejka on 14.04.2017.
 */

require("dotenv").config();
const DB = require('./db');
const Vacancy = require('./models/vacancy');
const moment = require('moment');

Vacancy.aggregate([
    {$match: {'createdAt': {
        $gte:moment().subtract(7,'days').toDate()
    }}},
    { $group: { _id: { $dayOfMonth: "$createdAt"}, count: { $sum: 1 } } }
] ,function(err, docs){
    console.log(err)
    console.log(docs,'docs')
});

