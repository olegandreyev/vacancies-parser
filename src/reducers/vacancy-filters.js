/**
 * Created by Olejka on 09.03.2017.
 */

const initialState = {
    page: 1,
    keywords: '',
    region: null,
    resource: null,
    isHot: false
};

import {
    SEARCH_VACANCIES,
} from 'app_constants';

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case SEARCH_VACANCIES:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
}