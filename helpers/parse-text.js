/**
 * Created by Olejka on 27.02.2017.
 */

module.exports = function parseText(str){
    return str.replace(/(\r|\t|\n)+/g,'').trim()
}