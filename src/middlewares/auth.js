

import { AUTH_SUCCESS } from 'app_constants';
import { push } from 'react-router-redux';
import { client }  from 'helpers'

export const authMiddleware = store => next => action => {
    if(action.type === AUTH_SUCCESS){
        let token = action.payload.token;
        localStorage.setItem("authToken", token);
        client.defaults.headers.common['Authorization'] = token;
        next(action);
        store.dispatch(push("/dashboard"))
    } else {
        next(action);
    }
};