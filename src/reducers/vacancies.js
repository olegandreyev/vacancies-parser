/**
 * Created by Olejka on 09.03.2017.
 */

const initialState = {
    vacancies: [],
    isFetching: false,
    count: 0,
};

import {FETCH_VACANCIES_SUCCESS, FETCH_VACANCIES_PENDING, FETCH_VACANCIES_ERROR} from 'app_constants';

export default function (state = initialState, {type, payload}) {
    switch (type) {
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