/**
 * Created by Olejka on 10.04.2017.
 */

import {SEARCH_VACANCIES, FETCH_VACANCIES, FETCH_VACANCIES_MONTHDAY, GET_VACANCY_INFO, FETCH_VACANCY_INFO} from 'app_constants';
import { client } from 'helpers';

export function searchVacancies(searchObj){
    return {
        type:SEARCH_VACANCIES,
        payload:searchObj
    }
}

export function fetchVacancies(searchObject){
    return {
        type:FETCH_VACANCIES,
        payload:client.post(`/api/vacancies`, searchObject).then(response => response.data)
    }
}

export function fetchDayOfMonthStatistic(){
    return {
        type:FETCH_VACANCIES_MONTHDAY,
        payload:client.get(`/api/dayStatistic`).then(response => response.data)
    }
}

export function fetchVacancyInfo(vId){
    return {
        type: FETCH_VACANCY_INFO,
        payload: client.get(`/api/vacancies/${vId}`).then(response => response.data)
    }
}

export function fetchVacancyInfoIfNeeded(vId){
    return {
        type:GET_VACANCY_INFO,
        payload:vId
    }
}

