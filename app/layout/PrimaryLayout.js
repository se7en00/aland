import React from 'react';
import PropTypes from 'prop-types';
import { sidebar } from 'constants';
import Header from './header/Header';
import SideBar from './sideBar/SideBar';
import Main from './main/Main';

const PrimaryLayout = ({ match }) => (
    <div className="container-fluid">
        <Header/>
        <div className="row">
            <SideBar menuData={sidebar}/>
            <Main match={match}/>
        </div>
    </div>
);

PrimaryLayout.propTypes = {
    match: PropTypes.object
};

export default PrimaryLayout;
