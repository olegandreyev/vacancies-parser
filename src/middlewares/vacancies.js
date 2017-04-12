

import { AUTH_SUCCESS, SEARCH_VACANCIES } from 'app_constants';
import { replace, push } from 'react-router-redux';
import { fetchVacancies } from 'actions'

const searchMiddleware = store => next => action => {
    if(action.type === SEARCH_VACANCIES){
        const { keywords, page } = action.payload;
        next(action);
        let route = location.pathname;
        let changedUrl = `/dashboard/search?keywords=${keywords}&page=${page}`;
        let routeAction = route === '/dashboard' ? push(changedUrl) : replace(changedUrl);
        store.dispatch(routeAction);
        store.dispatch(fetchVacancies(keywords, page))
    } else{
        next(action);
    }
};

export default searchMiddleware;