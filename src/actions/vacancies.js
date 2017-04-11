/**
 * Created by Olejka on 10.04.2017.
 */

import {SEARCH_VACANCIES, FETCH_VACANCIES} from 'app_constants';
import { client } from 'helpers';

export function searchVacancies(keywords, page){
    return {
        type:SEARCH_VACANCIES,
        payload:{
            keywords, page
        }
    }
}

export function fetchVacancies(keywords, page){
    return {
        type:FETCH_VACANCIES,
        payload:client.get(`/api/vacancies?keywords=${keywords}&page=${page}`).then(response => response.data)
    }
}