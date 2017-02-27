/**
 * Created by Olejka on 27.02.2017.
 */

const RabotaUaStrategy = require('./rabota.ua');
const WorkUaStrategy = require('./work.ua');
const DouUaStrategy = require('./dou.ua');

module.exports = {
    RabotaUA:RabotaUaStrategy,
    WorkUA:WorkUaStrategy,
    DouUA:DouUaStrategy
};