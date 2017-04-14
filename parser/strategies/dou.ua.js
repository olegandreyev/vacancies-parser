/**
 * Created by Olejka on 27.02.2017.
 */

const SEARCH_KEYWORDS = "Программист, Developer, Разработчик";
const VACANCIES_HOST = "https://jobs.dou.ua/";

const rp = require('request-promise');
const cheerio = require('cheerio');
const moment = require('moment');

const parseText = require('../helpers/parse-text');
const addAdditionalInfo = require('../helpers/add-additional-inf');
const promiseQueue = require('../helpers/promise-queue');
const getRequestOption = require('../helpers/request-options');

class DouUAStrategy {
    constructor(){
        this.currentPage = -1;
        this.csrfToken = null;
        this.cookie = null;
        this.name = 'DOU.UA'
    }
    nextPage(){
        this.currentPage++;
    }
    getCurrentPage(){
        return this.currentPage;
    }
    _getCsrfToken(){
        if(!this.csrfToken || !this.cookie) {
            return rp({
                uri:VACANCIES_HOST,
                resolveWithFullResponse: true
            }).then(response => {
                this.cookie = response.headers['set-cookie'].join();
                const $ = cheerio.load(response.body);
                this.csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
            })
        } else {
            return Promise.resolve();
        }
    }
    _getVacancies(){
        return this._getCsrfToken().then(() => {
            const jar = rp.jar();
            jar.setCookie(this.cookie, VACANCIES_HOST);
            return rp({
                uri:"https://jobs.dou.ua/vacancies/xhr-load/",
                method:"POST",
                jar,
                formData:{
                    csrfmiddlewaretoken:this.csrfToken,
                    count:this.currentPage*40
                },
                headers:{
                    "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
                    "referer":"https://jobs.dou.ua/"
                },
                json:true,
                transform:function(body){
                    return cheerio.load("<ul>"+body.html+ "</ul>");
                }
            })
        })
    }
    parse(){
        return this._getVacancies()
            .then($ => {
             const vacancies = [];
            $('li.l-vacancy').each((i, row) => {
                const vacancy = {};
                const $row = $(row);
                vacancy._id = $row.find('a.vt').attr('href').replace('?from=list_hot',"");
                if(!vacancy._id)return;
                let regionStr = parseText( $row.find('span.cities').text().replace("?","") );
                vacancy.region = !regionStr ? ["Другой"] : regionStr.split(", ");
                vacancy.title = parseText( $row.find('a.vt').text() );
                vacancy.companyName = parseText( $row.find('a.company').text()) ;
                vacancy.shortDescr = parseText( $row.find('.sh-info').text() ) || null;
                vacancy.salary = parseText( $row.find('.salary').text() ) || null;
                vacancy.tags = [];
                vacancy.link = vacancy._id;
                vacancy.companyLink = $row.find('a.company').attr("href");
                vacancy.resource = 'dou-ua';
                vacancy.isHot = $row.is(".__hot");
                vacancies.push(vacancy)
            });
            return vacancies;
        }).then(vacancies => {
                const links = vacancies.map(v => v.link);
                const promises = promiseQueue(links,(url) => {
                    return rp( getRequestOption(url, false) ).then($ => {
                        let fullDescr = $('div[itemprop="description"]').html();
                        if(fullDescr){
                            fullDescr = parseText(fullDescr)
                        }
                        let additionalParams = [];
                        let logo = $('.b-compinfo img').attr('src') || null;
                        let postedAt = parseText( $('.date').text() );

                        return {
                            fullDescr,
                            additionalParams,
                            logo,
                            postedAt
                        }
                    })
                });
                return promises.fireQueue().then(results => {
                    return vacancies = vacancies.map((v,i) => {
                        return addAdditionalInfo(v, results[i])
                    });
                })
        }).catch(err => {
            console.log(err, 'error');
             return [];
        })
    }
}




module.exports = DouUAStrategy;
