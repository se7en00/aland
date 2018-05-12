import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import {ConnectedSwitch} from 'routes';
import classnames from 'classnames';
import { sidebar } from 'constants';
import { Dashboard } from 'components/dashboard/';
import AccountManagement from 'components/accountManagement/AccountManagement';
import Header from './header/Header';
import SideBar from './sideBar/SideBar';
import mainContentStyle from './Main.scss';

const PrimaryLayout = ({ match }) => {
    const mainClass = classnames('col-md-9 col-lg-10', mainContentStyle.mainContent);
    return (
        <div className="container-fluid">
            <Header/>
            <div className="row">
                <SideBar menuData={sidebar}/>
                <main className={mainClass}>
                    <div className={mainContentStyle.panel}>
                        <ConnectedSwitch>
                            <Route exact path={`${match.path}`} component={Dashboard}/>
                            <Route exact path={`${match.path}accountManagement`} component={AccountManagement}/>
                        </ConnectedSwitch>
                    </div>
                </main>
            </div>
        </div>
    );
};

PrimaryLayout.propTypes = {
    match: PropTypes.object
};

export default PrimaryLayout;
