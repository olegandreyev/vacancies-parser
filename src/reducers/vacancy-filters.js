/**
 * Created by Olejka on 09.03.2017.
 */

const initialState = {
    regions: [],
    resources: [],
    isRegionsFetching:false,
    isResourcesFetching:false,

    search: {
        page: 1,
        keywords: '',
        region: null,
        resource: null,
        isHot: false
    }
};

import {
    SEARCH_VACANCIES,

    FETCH_RESOURCE_LIST_PENDING,
    FETCH_RESOURCE_LIST_SUCCESS,
    FETCH_RESOURCE_LIST_ERROR,

    FETCH_REGION_LIST_PENDING,
    FETCH_REGION_LIST_SUCCESS,
    FETCH_REGION_LIST_ERROR,

} from 'app_constants';

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case SEARCH_VACANCIES:
            return {
                ...state,
                search:{
                    ...state.search,
                    ...payload
                }
            };
        case FETCH_RESOURCE_LIST_PENDING:
            return {
                ...state,
                isResourcesFetching: true
            };
        case FETCH_RESOURCE_LIST_SUCCESS:
            return {
                ...state,
                isResourcesFetching: false,
                resources:payload
            };
        case FETCH_RESOURCE_LIST_ERROR:
            return {
                ...state,
                isResourcesFetching:false,
                resources:[]
            };

        case FETCH_REGION_LIST_PENDING:
            return {
                ...state,
                isRegionsFetching: true
            };
        case FETCH_REGION_LIST_SUCCESS:
            return {
                ...state,
                isRegionsFetching: false,
                regions:payload
            };
        case FETCH_REGION_LIST_ERROR:
            return {
                ...state,
                isRegionsFetching:false,
                regions:[]
            };

        default:
            return state;
    }
}