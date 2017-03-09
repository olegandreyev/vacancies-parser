/**
 * Created by Olejka on 09.03.2017.
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import * as reducers from 'reducers'
import { browserHistory } from 'react-router'
import {routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';

export default function() {

    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const rrMiddleware = routerMiddleware(browserHistory);

    return createStore(
        combineReducers({
            ...reducers,
            routing: routerReducer
        }),
        composeEnhancers(
            applyMiddleware(thunk, rrMiddleware)
        )
    );
}


