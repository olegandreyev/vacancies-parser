/**
 * Created by Olejka on 09.03.2017.
 */

const initialState = {
    regions: [],
    isFetching:false,
    isFetched:false
};

import {
    FETCH_REGION_LIST_PENDING,
    FETCH_REGION_LIST_SUCCESS,
    FETCH_REGION_LIST_ERROR,
} from 'app_constants';

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case FETCH_REGION_LIST_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_REGION_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isFetched:true,
                regions:payload
            };
        case FETCH_REGION_LIST_ERROR:
            return {
                ...state,
                isFetching:false,
                isFetched:false,
                regions:[]
            };
        default:
            return state;
    }
}