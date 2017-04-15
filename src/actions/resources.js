/**
 * Created by Olejka on 15.04.2017.
 */

import { FETCH_RESOURCE_LIST } from 'app_constants'
import { client } from 'helpers'

export function fetchResourceList(){
    return {
        type:FETCH_RESOURCE_LIST,
        payload:client.get("/api/resources").then(response => response.data)
    }
}