/**
 * Created by Olejka on 27.02.2017.
 */


const Parser = require('./parser');

const RabotaUAStrategy = require('./parser/strategies').RabotaUA;
const WorkUAStrategy = require('./parser/strategies').WorkUA;
const DouUAStrategy = require('./parser/strategies').DouUA;

//todo change companySite on companyLink

const parser = new Parser();
parser.setStrategy(new DouUAStrategy());

parser.parseVacancies();



