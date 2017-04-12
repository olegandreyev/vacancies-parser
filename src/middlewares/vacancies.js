

import { AUTH_SUCCESS, SEARCH_VACANCIES } from 'app_constants';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import { fetchVacancies } from 'actions'
import { change } from 'redux-form'

const searchMiddleware = store => next => action => {
    if(action.type === SEARCH_VACANCIES){
        const { keywords, page } = action.payload;
        next(action);
        store.dispatch(push(`/dashboard/search?keywords=${keywords}&page=${page}`));
    } else if(action.type === LOCATION_CHANGE && action.payload.pathname === "/dashboard/search"){
        const { keywords, page } = action.payload.query;
        store.dispatch(change("searchVacancies", "keywords", keywords));
        store.dispatch(fetchVacancies(keywords, page));
    } else{
        next(action);
    }
};

export default searchMiddleware;