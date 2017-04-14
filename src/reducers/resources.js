/**
 * Created by Olejka on 09.03.2017.
 */

const initialState = {
    resources: [],
    isFetching:false,
};

import {

    FETCH_RESOURCE_LIST_PENDING,
    FETCH_RESOURCE_LIST_SUCCESS,
    FETCH_RESOURCE_LIST_ERROR,

} from 'app_constants';

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case FETCH_RESOURCE_LIST_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_RESOURCE_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                resources:payload
            };
        case FETCH_RESOURCE_LIST_ERROR:
            return {
                ...state,
                isFetching:false,
                resources:[]
            };
        default:
            return state;
    }
}