import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
import {sidebarList} from 'constants';
import { hot } from 'react-hot-loader';
import Main from './Main';
import Header from './header/Header';
import SideBar from './sideBar/SideBar';

const App = () => {
    const history = createHistory();
    return (
        <ConnectedRouter history={history}>
            <div className="container-fluid u-full-height">
                <Header/>
                <div className="row u-full-height">
                    <SideBar menuData={sidebarList}/>
                    <Main/>
                </div>
            </div>
        </ConnectedRouter>
    );
};

export default hot(module)(App);
