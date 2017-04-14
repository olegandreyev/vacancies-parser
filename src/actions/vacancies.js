/**
 * Created by Olejka on 10.04.2017.
 */

import {SEARCH_VACANCIES, FETCH_VACANCIES, FETCH_REGION_LIST, FETCH_RESOURCE_LIST} from 'app_constants';
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

export function fetchRegionList(){
    return {
        type:FETCH_REGION_LIST,
        payload:client.get("/api/regions").then(response => response.data)
    }
}

export function fetchResourceList(){
    return {
        type:FETCH_RESOURCE_LIST,
        payload:client.get("/api/resources").then(response => response.data)
    }
}