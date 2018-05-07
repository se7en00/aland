import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {sidebarList} from 'constants';
import { hot } from 'react-hot-loader';
import Main from './Main';
import Header from './header/Header';
import SideBar from './sideBar/SideBar';

const App = () => (
    <BrowserRouter>
        <div className="container-fluid u-full-height">
            <Header/>
            <div className="row u-full-height">
                <SideBar menuData={sidebarList}/>
                <Main/>
            </div>
        </div>
    </BrowserRouter>
);

export default hot(module)(App);
