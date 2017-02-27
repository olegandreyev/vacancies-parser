/**
 * Created by Olejka on 27.02.2017.
 */

const RabotaUAStrategy = require('./rabota.ua');
const WorkUAStrategy = require('./work.ua');
const DouUAStrategy = require('./dou.ua');

module.exports = {
    RabotaUA:RabotaUAStrategy,
    WorkUA:WorkUAStrategy,
    DouUA:DouUAStrategy
};