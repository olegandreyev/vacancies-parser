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

if(!process.send) {
    const rabotaUaParserProcess = cp.fork(__dirname + '/parser-run');
    const workUaParserProcess = cp.fork(__dirname + '/parser-run');
    const douUaParserProcess = cp.fork(__dirname + '/parser-run');

    rabotaUaParserProcess.send({strategy: "rabota.ua"});
    workUaParserProcess.send({strategy: "work.ua"});
    douUaParserProcess.send({strategy: "dou.ua"});
}

const parser = new Parser();
process.on('message',({strategy}) => {
    switch (strategy){
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
    }
});





