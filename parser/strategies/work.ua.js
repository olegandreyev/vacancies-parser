/**
 * Created by Olejka on 27.02.2017.
 */

const SEARCH_KEYWORDS = "Программист, Developer, Разработчик";
const VACANCIES_HOST = "https://work.ua/";

const rp = require('request-promise');
const moment = require('moment');

const promiseQueue = require('../helpers/promise-queue');
const parseText = require('../helpers/parse-text');
const getRequestOption= require('../helpers/request-options');
const addAdditionalInfo = require('../helpers/add-additional-inf');



class WorkUAStrategy {
    constructor(){
        this.currentPage = 0;
        this.name = 'WORK.UA'
    }
    nextPage(){
        this.currentPage++;
    }
    getCurrentPage(){
        return this.currentPage;
    }
    parse(){
        return rp(
            getRequestOption(`${VACANCIES_HOST}/jobs-${encodeURIComponent(SEARCH_KEYWORDS)}/?page=${this.currentPage}`)
        ).then($ => {
            const vacancies = [];
            $('.job-link').each((i, row) => {
                const $row = $(row);
                const vacancy = {};
                const $link = $row.find('h2 a');
                vacancy._id = $link.attr('href');
                if(!vacancy._id) return;
                vacancy.link = VACANCIES_HOST+vacancy._id.slice(1);
                vacancy.resource = 'work-ua';
                vacancy.title = parseText( $link.text() );
                vacancy.salary = parseText( $link.next().text().replace(",", '') ) || null;
                vacancy.isHot = !!$row.find('.label-hot').length;
                vacancy.logo = $row.find('.logo-img img').attr('src') || null;
                vacancy.companyName = parseText( $row.find('div:not(.logo-img)').find('span:first-child').text().replace("·",'') );
                vacancy.shortDescr = parseText( $row.find('p').text() );
                vacancy.tags = [];
                vacancy.region = parseText( $row.find('div:not(.logo-img)').text().split("·")[1] );
                vacancies.push(vacancy)
            });
            return vacancies;
        }).then(vacancies => {
            const links = vacancies.map(v => v.link);
            const promises = promiseQueue(links,(url) => {
                return rp( getRequestOption(url, false) ).then($ => {
                    let fullDescr = $('.overflow.wordwrap').html();
                    if(fullDescr){
                        fullDescr = parseText(fullDescr)
                    }
                    let additionalParams = [parseText( $('dd:last-child').text() )];
                    let logo = $('.f-vacancy-logo-container img').attr('src') || null;

                    let dd = $('dd')[0];
                    let companyLink = $(dd).find('a').attr('href');
                     companyLink = companyLink ? VACANCIES_HOST + companyLink.slice(1) : null;
                    let postedAt =  null;

                    return {
                        fullDescr,
                        additionalParams,
                        logo,
                        companyLink,
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



module.exports = WorkUAStrategy;
