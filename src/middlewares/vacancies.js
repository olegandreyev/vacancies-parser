

import { AUTH_SUCCESS, SEARCH_VACANCIES } from 'app_constants';
import { replace, push } from 'react-router-redux';
import { fetchVacancies } from 'actions'

const searchMiddleware = store => next => action => {
    if(action.type === SEARCH_VACANCIES){
        const { keywords, page } = action.payload;
        next(action);
        //requires for change query params in URL string
        let route = location.pathname;
        let changedUrl = `/dashboard/search?keywords=${keywords}&page=${page}`;
        let routeAction = route === '/dashboard/search' ? replace(changedUrl) : push(changedUrl);
        store.dispatch(routeAction);
        store.dispatch(fetchVacancies(keywords, page))
    } else{
        next(action);
    }
};

export default searchMiddleware;