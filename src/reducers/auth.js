/**
 * Created by Olejka on 09.03.2017.
 */

const initialState = {
    user:null,
    token:null,
    statusText:null,
    isAuthenticating:false,
    isAuthenticated:false,
};

import {AUTH_SUCCESS, AUTH, AUTH_FAIL} from 'constants';

export default function(state = initialState,{type, payload}){
    switch (type){
        case AUTH:
            return {...state, isAuthenticating:true, statusText:null}
        case AUTH_SUCCESS:
            const {user, statusText, token} = payload;
            return {
                user,
                statusText,
                token,
                isAuthenticating:false,
                isAuthenticated:true
            };
        case AUTH_FAIL:
            return {
                user:null,
                token:null,
                isAuthenticating:false,
                statusText:payload.statusText,
                isAuthenticated:false
            }
        default:
            return state;
    }
}