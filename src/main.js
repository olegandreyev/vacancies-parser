/**
 * Created by Olejka on 13.02.2017.
 */

import './styles/style.less';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './configure-store'
import { App, Login, Register } from 'routes';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Login}/>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}>/</Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

// function authActionsBeforeLoad(nextState, replace, callback) {
//     console.log(arguments);
// }


