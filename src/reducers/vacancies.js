/**
 * Created by Olejka on 09.03.2017.
 */

const initialState = {
    vacancies: [],
    isFetching: false,
    count: 0,
    search: {
        page: 1,
        keywords: '',
        region:null,
        resource:null,
        isHot:false
    }
};

import {SEARCH_VACANCIES, FETCH_VACANCIES_SUCCESS, FETCH_VACANCIES_PENDING, FETCH_VACANCIES_ERROR} from 'app_constants';

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case SEARCH_VACANCIES:
            return {
                ...state,
                search: {
                    ...state.search,
                    ...payload
                }
            };
        case FETCH_VACANCIES_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_VACANCIES_SUCCESS:
            return {
                ...state,
                count: payload.count,
                vacancies: payload.docs,
                isFetching: false
            };
        case FETCH_VACANCIES_ERROR:
            return {
                ...state,
                count: 0,
                vacancies: [],
                isFetching: false,
            };
        default:
            return state;
    }
}