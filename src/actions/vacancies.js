/**
 * Created by Olejka on 10.04.2017.
 */

import {SEARCH_VACANCY} from 'constants';
import { client } from 'helpers';

export function fetchVacancies(keywords, page){
    return {
        type:SEARCH_VACANCY,
        payload:client.get(`/api/vacancies?keywords=${keywords}&page=${page}`).then(response => response.data)
    }
}