import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import {AuthorizedRoute} from 'routes/index';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrimaryLayout from 'layout/PrimaryLayout';
import { hot } from 'react-hot-loader';
import { history } from '../utils/index';
import LoginView from '../views/login/loginView';


const App = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route path="/login" component={LoginView}/>
            <AuthorizedRoute path="/aland" component={PrimaryLayout}/>
            <Redirect to="/aland"/>
        </Switch>
    </ConnectedRouter>
);

export default hot(module)(App);
