/**
 * Created by Olejka on 09.03.2017.
 */

const initialState = {
    user:null,
    token:null,
    isAuthenticated:false
};

import { AUTH_SUCCESS } from 'constants';

export default function(state = initialState,{type, payload}){
    switch (type){
        case AUTH_SUCCESS:
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