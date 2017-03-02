/**
 * Created by Olejka on 27.02.2017.
 */

const SEARCH_KEYWORDS = "Программист, Developer, Разработчик";
const VACANCIES_HOST = "https://rabota.ua/";

const rp = require('request-promise');
const moment = require('moment');

const promiseQueue = require('../helpers/promise-queue');
const parseText = require('../helpers/parse-text');
const getRequestOption= require('../helpers/request-options');
const addAdditionalInfo = require('../helpers/add-additional-inf');


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
                vacancy.recource = 'rabota-ua';
                $row.find('.f-vacancylist-tags').find('a').each((i,el) => {
                    vacancy.tags.push( parseText($(el).text()) )
                });
                vacancy.companyLink = VACANCIES_HOST + $row.find('.f-vacancylist-companyname a').attr('href').slice(1);
                vacancies.push(vacancy)
            });
            return vacancies;
        }).then(vacancies => {
            const links = vacancies.map(v => v.link);
            const promises = promiseQueue(links,(url) => {
                return rp( getRequestOption(url, false) ).then($ => {
                    let fullDescr = $('.d_des').html() || $('.f-vacancy-description').html();
                    if(fullDescr){
                        fullDescr = parseText(fullDescr)
                    }
                    let additionalParams = [];
                    $('.f-additional-params .fd-farmer').each((i, el) => {
                        additionalParams.push($(el).text())
                    });
                    let logo = $('.f-vacancy-logo-container img').attr('src') || null;
                    let companyName = parseText($('span[itemprop="hiringOrganization"]').text());
                    let postedAt = parseText($('.f-vacancy-header-wrapper .f-date-holder').text()) || null;
                    return {
                        fullDescr,
                        additionalParams,
                        logo,
                        companyName,
                        postedAt
                    }
                })
            });
            return promises.fireQueue().then(results => {
                return vacancies = vacancies.map((v,i) => {
                   return addAdditionalInfo(v, results[i])
                });
            })
        }).then(vacancies =>{
            console.log(vacancies,'results')

        }).catch(err => {
            console.log(err)
        })
    }
}


module.exports = RabotaUAStrategy;
