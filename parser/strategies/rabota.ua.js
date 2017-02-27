/**
 * Created by Olejka on 27.02.2017.
 */

const SEARCH_KEYWORDS = "Программист, Developer, Разработчик";
const VACANCIES_HOST = "https://rabota.ua/";

const rp = require('request-promise');
const cheerio = require('cheerio');
const promiseQueue = require('../../lib/promise-queue');



class RabotaUAStrategy {
    constructor(){
        this.currentPage = 1;
    }
    nextPage(){
        this.currentPage++;
    }
    getCurrentPage(){
        return this.currentPage;
    }
    parse(){
        return rp(
            getRequestOption(`${VACANCIES_HOST}/jobsearch/vacancy_list?pg=${this.currentPage}&keyWords=${encodeURIComponent(SEARCH_KEYWORDS)}`)
        ).then($ => {
            const vacancies = [];
            const $table = $('table.f-vacancylist-tablewrap');
            $table.find('tr').each((index, row) => {
                const vacancy = {};
                const $row = $(row);

                vacancy.id = $row.find('.f-vacancylist-vacancytitle a').attr('href');
                if(!vacancy.id) return;
                const $link = $row.find('.f-vacancylist-vacancytitle a');
                vacancy.title = parseText($link.text());
                vacancy.link = VACANCIES_HOST+vacancy.id.slice(1);
                vacancy.isHot = !!$link.find('.f-vacancylist-characs-block  .fi-hot').length;
                const salary = $row.find('.-price').text();
                vacancy.salary = salary ? parseText( salary ) : null;
                vacancy.region = parseText( $row.find('.f-vacancylist-characs-block  .fd-soldier:not(.f-text-royal-blue)').text() );
                vacancy.shortDescr = $row.find('.f-vacancylist-shortdescr').text();
                vacancy.logo = $row.find('.f-vacancylist-companylogo img').attr('src') || null;
                vacancy.tags = [];
                $row.find('.f-vacancylist-tags').find('a').each((i,el) => {
                    vacancy.tags.push( parseText($(el).text()) )
                });
                vacancies.push(vacancy)
            });
            return vacancies;
        }).then(vacancies => {
            const links = vacancies.map(v => v.link);
            const promises = promiseQueue(links,(url) => {
                return rp( getRequestOption(url, false) ).then($ => {
                    let fullDescription = $('.d_des').html() || $('.f-vacancy-description').html();
                    if(fullDescription){
                        fullDescription = parseText(fullDescription)
                    }
                    let additionalParams = [];
                    $('.f-additional-params .fd-farmer').each((i, el) => {
                        additionalParams.push($(el).text())
                    });
                    let logo = $('.f-vacancy-logo-container img').attr('src') || null;
                    let companySite =  $('.f-main-params a.f-text-royal-blue').attr('href') || null;
                    let companyName = parseText($('span[itemprops="hiringOrganization"]').text());
                    let createdAt = parseText($('.f-vacancy-header-wrapper .f-date-holder').text()) || null;
                    if(createdAt){
                        createdAt = new Date(createdAt)
                    }
                    return {
                        fullDescription,
                        additionalParams,
                        logo,
                        companySite,
                        companyName,
                        createdAt
                    }
                })
            });
            return promises.fireQueue()
        }).then(results =>{
            console.log(results,'results')


        }).catch(err => {
            console.log(err)
        })
    }
}

function parseText(str){
    return str.replace(/(\r|\t|\n)+/g,'').trim()
}

function getRequestOption(url, decodeEntities = true){
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
}




module.exports = RabotaUAStrategy;
