/**
 * Created by Olejka on 09.03.2017.
 */

const initialState = {
    user:null,
    token:null,
    isAuthenticated:false
};

import { AUTH_SUCCESS, SET_USER } from 'app_constants';

export default function(state = initialState,{type, payload}){
    switch (type){
        case AUTH_SUCCESS:
        case SET_USER:
            const {user, token} = payload;
            return {
                user,
                token,
                isAuthenticated:true
            };
        default:
            return state;
    }
}