

import { GET_VACANCY_INFO } from 'app_constants';
import { fetchVacancyInfo } from 'actions';

const vacancyInfoMiddleware = store => next => action => {
        if(action.type === GET_VACANCY_INFO){
            const vacancies = store.getState().vacancies.vacancies;
            const selectedVacancy = vacancies.find(v => v._id === action.payload);
            if(selectedVacancy){
                action.payload = selectedVacancy;
                next(action);
            } else {
                store.dispatch(fetchVacancyInfo(action.payload))
            }
        } else {
            next(action)
        }
};

export default vacancyInfoMiddleware