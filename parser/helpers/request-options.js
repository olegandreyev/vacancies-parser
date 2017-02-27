/**
 * Created by Olejka on 27.02.2017.
 */

const cheerio = require('cheerio');

module.exports = function getRequestOption(url, decodeEntities = true){
    return {
        uri: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
        },
        transform: function (body) {
            return cheerio.load(body,{
                decodeEntities
            })
        }
    };
};