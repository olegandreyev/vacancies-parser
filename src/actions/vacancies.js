/**
 * Created by Olejka on 10.04.2017.
 */

import {SEARCH_VACANCIES, FETCH_VACANCIES, FETCH_VACANCIES_WEEKDAY} from 'app_constants';
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

export function fetchDayOfWeekStatistic(){
    return {
        type:FETCH_VACANCIES_WEEKDAY,
        payload:client.get(`/api/vacancies/dayStatistic`).then(response => response.data)
    }
}

