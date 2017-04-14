/**
 * Created by Olejka on 14.04.2017.
 */

require("dotenv").config();
const DB = require('./db');
const Vacancy = require('./models/vacancy');

Vacancy.aggregate([
    {$unwind: "$region" },
    {$group: { _id: "$region", count: { $sum: 1 } }},
], function(err, docs){
    console.log(err)
    console.log(docs,'docs')
});

Vacancy.aggregate([
    {$group: { _id: "$resource", count: { $sum: 1 } }},
], function(err, docs){
    console.log(err)
    console.log(docs,'docs')
});