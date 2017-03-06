/**
 * Created by Olejka on 27.02.2017.
 */
require('dotenv').config();
const DB = require('./db/index');
const Parser = require('./parser');

const RabotaUAStrategy = require('./parser/strategies').RabotaUA;
const WorkUAStrategy = require('./parser/strategies').WorkUA;
const DouUAStrategy = require('./parser/strategies').DouUA;

//todo change companySite on companyLink

console.log('RABOTA.UA: start parsing!');
const parser = new Parser();
parser.setStrategy(new RabotaUAStrategy());
parser.parseVacancies()
    .then(result => {
        if (result) {
            console.log("RABOTA.UA: FINISH PARSE")
        } else {
            console.log("RABOTA.UA: FAIL PARSE!")
        }
        console.log('WORK.UA: start parsing!');
        parser.setStrategy(new WorkUAStrategy());
        return parser.parseVacancies();
    }).then(result => {
    if (result) {
        console.log("WORK.UA: FINISH PARSE")
    } else {
        console.log("WORK.UA: FAIL PARSE!")
    }
    console.log('Dou UA: start parsing!');
    parser.setStrategy(new DouUAStrategy());
    return parser.parseVacancies();
}).then(result => {
    if (result) {
        console.log("DOU.UA: FINISH PARSE")
    } else {
        console.log("DOU.UA: FAIL PARSE!")
    }
    console.log("FINISH PARSE OF ALL RESOURCES")
});




