/**
 * Created by Olejka on 27.02.2017.
 */
require('dotenv').config();
const DB = require('./db/index');
const Parser = require('./parser');
const cp = require('child_process');

const RabotaUAStrategy = require('./parser/strategies').RabotaUA;
const WorkUAStrategy = require('./parser/strategies').WorkUA;
const DouUAStrategy = require('./parser/strategies').DouUA;

const params = process.argv;

if (!params[2]) {
    cp.fork(__dirname + '/parser-run', ['rabota.ua']);
    cp.fork(__dirname + '/parser-run', ['work.ua']);
    cp.fork(__dirname + '/parser-run', ['dou.ua']);
} else {
    const parser = new Parser();
    switch (params[2]) {
        case "rabota.ua":
            console.log('RABOTA.UA: start parsing!');
            parser.setStrategy(new RabotaUAStrategy());
            parser.parseVacancies().then(result => {
                console.log("RABOTA.UA: FINISH PARSING!");
                process.exit(0);
            });

            break;
        case "work.ua":
            console.log('WORK.UA: start parsing!');
            parser.setStrategy(new WorkUAStrategy());
            parser.parseVacancies().then(result => {
                console.log("WORK.UA: FINISH PARSING!");
                process.exit(0);
            });
            break;
        case "dou.ua":
            console.log('DOU.UA: start parsing!');
            parser.setStrategy(new DouUAStrategy());
            parser.parseVacancies().then(result => {
                console.log("DOU.UA: FINISH PARSING!");
                process.exit(0)
            });
            break;
        default:
            break;
    }
}





