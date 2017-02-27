/**
 * Created by Olejka on 27.02.2017.
 */


const Parser = require('./parser');
const RabotaUAStrategy = require('./parser/strategies').RabotaUA;

const parser = new Parser();
parser.setStrategy(new RabotaUAStrategy());

parser.parseVacancies();



