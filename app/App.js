import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import {AuthorizedRoute} from 'routes';
import { Route, Switch } from 'react-router-dom';
import PrimaryLayout from 'layout/PrimaryLayout';
import { hot } from 'react-hot-loader';
import { history } from './utils/index';
import { LoginView } from './components/login';


const App = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route path="/login" component={LoginView}/>
            <AuthorizedRoute path="/" component={PrimaryLayout}/>
        </Switch>
    </ConnectedRouter>
);

export default hot(module)(App);
