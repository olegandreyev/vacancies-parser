/**
 * Created by Olejka on 28.03.2017.
 */

import { replace } from 'react-router-redux'
import { logout } from 'actions'

export default function(client, {dispatch}){
    client.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if(error.response.status === 401){
            localStorage.removeItem("authToken");
            dispatch(logout());
            dispatch(replace("/login"));
        }
        return Promise.reject(error);
    });
    let token = localStorage.getItem("authToken");
    if(token) {
        client.defaults.headers.common['Authorization'] = token
    }
}