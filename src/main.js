/**
 * Created by Olejka on 13.02.2017.
 */

import './styles/style.less';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {client} from 'helpers'
import {setUser} from 'actions'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from './configure-store'
import configureClient from './configure-client';
import {App, Login, Register, Main, Vacancies, AnalyzeDashboard} from 'routes';


const store = configureStore();
configureClient(client, store);
const history = syncHistoryWithStore(browserHistory, store);

const checkAuth = (nextState, replace, callback) => {
    const token = localStorage.getItem('authToken');
    const route = nextState.location.pathname;
    if (token && store.getState().auth.user === null) {
        client.get("/api/me").then(response => {
            store.dispatch(setUser({
                user: response.data,
                token
            }));
            if(route === '/') {
                replace("/dashboard");
            }
            callback();
        }).catch(err => {
            callback();
        })
    } else {
        callback();
    }
};

const requireAuth = (nextState, replace, callback) => {
    const isAuthenticated = store.getState().auth.isAuthenticated;
    if (isAuthenticated) {
        callback();
    } else {
        replace('/login');
        callback();
    }
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} onEnter={checkAuth}>
                <IndexRoute component={Login}/>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}>/</Route>
                <Route onEnter={requireAuth}>
                    <Route path="dashboard" component={Main}>
                        <IndexRoute component={AnalyzeDashboard}/>
                        <Route path="search" component={Vacancies}/>
                    </Route>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

