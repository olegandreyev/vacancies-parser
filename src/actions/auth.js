/**
 * Created by Olejka on 21.03.2017.
 */

import { AUTH_SUCCESS, SET_USER, LOGOUT } from 'app_constants'

export function authSuccess(data){
    return {
        type:AUTH_SUCCESS,
        payload:{
            user:data.user,
            token:data.token
        }
    }
}

export function logout(){
    return {
        type:LOGOUT,
        payload:{}
    }
}

export function setUser(data){
    return {
        type:SET_USER,
        payload:{
            user:data.user,
            token:data.token
        }
    }
}