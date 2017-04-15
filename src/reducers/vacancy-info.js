/**
 * Created by Olejka on 15.04.2017.
 */


const initialState = {
    vacancyInfo:null,
    isFetching: false,
    err:null
};
import { GET_VACANCY_INFO, FETCH_VACANCY_INFO_ERROR, FETCH_VACANCY_INFO_PENDING, FETCH_VACANCY_INFO_SUCCESS } from 'app_constants'

export default function vacancyInfo(state = initialState, action){
    switch (action.type){
        case FETCH_VACANCY_INFO_PENDING:
            return {
                vacancyInfo:null,
                isFetching: true,
                err:null
            };
        case GET_VACANCY_INFO:
        case FETCH_VACANCY_INFO_SUCCESS:
            return {
                vacancyInfo:action.payload,
                isFetching:false,
                err:null
            };
        case FETCH_VACANCY_INFO_ERROR:{
            return {
                vacancyInfo:null,
                isFetching:false,
                err:action.payload,
            }
        }
        default : return state;
    }
}