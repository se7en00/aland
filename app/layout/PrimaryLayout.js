import React from 'react';
import PropTypes from 'prop-types';
import { renderSideBarWithPermissions } from 'constants';
import Header from './header/Header';
import SideBar from './sideBar/SideBar';
import Main from './main/Main';

const PrimaryLayout = ({ match }) => {
    const sidebar = renderSideBarWithPermissions();
    const noPermission = !sidebar || sidebar.length === 0;
    return (
        <div className="container-fluid">
            <Header/>
            <div className="row">
                {!noPermission && <SideBar menuData={sidebar}/>}
                <Main match={match} fluidWidth={noPermission}/>
            </div>
        </div>
    );
};

PrimaryLayout.propTypes = {
    match: PropTypes.object
};

export default PrimaryLayout;
