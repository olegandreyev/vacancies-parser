/**
 * Created by Olejka on 21.03.2017.
 */

import { AUTH_SUCCESS } from 'constants'

export function authSuccess(data){
    return {
        type:AUTH_SUCCESS,
        payload:{
            user:data.user,
            token:data.token
        }
    }
}
