import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import DashboardView from 'views/home/DashboardView';
import OnlineLessonsAddView from 'views/onlineLessons/OnlineLessonsAddView';
import OnlineLessonsView from 'views/onlineLessons/OnlineLessonsView';
import oneClickView from 'views/oneClick/OneClickView';
import OneClickAddView from 'views/oneClick/OneClickAddView';
import AccountListView from 'views/accountSetting/AccountListView';
import UserList from 'views/userManagement/UserList';
import {ConnectedSwitch} from './ConnectedSwitch';

const Routes = ({match}) => (
    <ConnectedSwitch>
        <Route exact path={`${match.path}`} component={DashboardView}/>
        <Route exact path={`${match.path}/accountManagement`} component={AccountListView}/>
        <Route exact path={`${match.path}/onlineLessons`} component={OnlineLessonsView}/>
        <Route exact path={`${match.path}/onlineLessons/add`} component={OnlineLessonsAddView}/>
        <Route exact path={`${match.path}/oneClick`} component={oneClickView}/>
        <Route exact path={`${match.path}/oneClick/add`} component={OneClickAddView}/>
        <Route exact path={`${match.path}/userManagement`} component={UserList}/>
    </ConnectedSwitch>
);

Routes.propTypes = {
    match: PropTypes.object
};

export default Routes;
