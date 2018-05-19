import React from 'react';
import {ConnectedSwitch} from 'routes';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import className from 'classnames';
import { Dashboard } from 'components/dashboard/';
import AccountManagement from 'components/accountManagement/AccountManagement';
import mainContentStyle from './Main.scss';
import Breadcrumb from './BreadCrumb';

const Main = (props) => {
    const {match} = props;
    const mainClass = className('col-md-9 col-lg-10', mainContentStyle.mainContent);
    return (
        <main className={mainClass}>
            <Breadcrumb/>
            <div className={mainContentStyle.panel}>
                <ConnectedSwitch>
                    <Route exact path={`${match.path}`} component={Dashboard}/>
                    <Route exact path={`${match.path}accountManagement`} component={AccountManagement}/>
                </ConnectedSwitch>
            </div>
        </main>
    );
};

Main.propTypes = {
    match: PropTypes.object
};


export default Main;
