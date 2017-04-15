/**
 * Created by Olejka on 15.04.2017.
 */

import { FETCH_REGION_LIST } from 'app_constants'
import { client } from 'helpers'

export function fetchRegionList(){
    return {
        type:FETCH_REGION_LIST,
        payload:client.get("/api/regions").then(response => response.data)
    }
}