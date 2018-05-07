import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {sidebarList} from 'constants';
import { hot } from 'react-hot-loader';
import Main from './Main';
import Header from './header/Header';
import SideBar from './sideBar/SideBar';

const App = () => (
    <Router>
        <div className="container-fluid u-full-height">
            <Header/>
            <div className="row u-full-height">
                <SideBar menuData={sidebarList}/>
                <Main/>
            </div>
        </div>
    </Router>
);

export default hot(module)(App);
