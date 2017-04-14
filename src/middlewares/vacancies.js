

import { AUTH_SUCCESS, SEARCH_VACANCIES } from 'app_constants';
import { replace, push } from 'react-router-redux';
import { fetchVacancies } from 'actions'

const searchMiddleware = store => next => action => {
    if(action.type === SEARCH_VACANCIES){

        const vacanciesSearch = store.getState().vacancyFilters;
        //add missing values to search payload
        let searchObj = {
            ...vacanciesSearch,
            ...action.payload
        };
        let queryString = getQueryStringByObject(searchObj);

        //requires for change query params in URL string
        let route = location.pathname;
        let changedUrl = `/dashboard/search?${queryString}`;
        let routeAction = route === '/dashboard/search' ? replace(changedUrl) : push(changedUrl);

        next(action);
        store.dispatch(routeAction);
        if(route === '/dashboard/search') {
            store.dispatch(fetchVacancies(searchObj))
        }
    } else{
        next(action);
    }
};

function getQueryStringByObject(searchObj){
   return Object.keys(searchObj).reduce((queryStr, param, i, arr) => {
       if(searchObj[param] === null || searchObj[param] === '') return queryStr;
       if(param === 'isHot' && !searchObj[param]) return queryStr;
       if(i !== 0){
           queryStr+="&"
       }
       queryStr+=`${param}=${searchObj[param]}`;
       return queryStr;
   },'')
}

export default searchMiddleware;