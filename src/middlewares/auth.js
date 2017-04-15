

import { AUTH_SUCCESS, LOGOUT } from 'app_constants';
import { push, replace } from 'react-router-redux';
import { client }  from 'helpers'

const authMiddleware = store => next => action => {
    if(action.type === AUTH_SUCCESS){
        let token = action.payload.token;
        localStorage.setItem("authToken", token);
        client.defaults.headers.common['Authorization'] = token;
        next(action);
        store.dispatch(push("/dashboard"))
    } else if(action.type === LOGOUT) {
        localStorage.removeItem("authToken");
        store.dispatch(replace("/login"));
        next(action);
    } else {
        next(action);
    }
};

export default authMiddleware