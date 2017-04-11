

import { AUTH_SUCCESS, SEARCH_VACANCIES } from 'app_constants';
import { push } from 'react-router-redux';
import { fetchVacancies } from 'actions'

const searchMiddleware = store => next => action => {
    if(action.type === SEARCH_VACANCIES){
        const { keywords, page } = action.payload;
        next(action);
        store.dispatch(fetchVacancies(keywords, page));
        store.dispatch(push(`/dashboard/search?keywords=${keywords}&page=${page}`));
    } else {
        next(action);
    }
};

export default searchMiddleware;