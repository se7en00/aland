import React from 'react';
import {ConnectedSwitch} from 'routes';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import className from 'classnames';
import DashboardView from 'views/home/DashboardView';
import AccountListView from 'views/accountSetting/AccountListView';
import OnlineLessonsView from 'views/resourceManagement/OnlineLessonsView';
import mainContentStyle from './Main.scss';
import Breadcrumb from './BreadCrumb';

const Main = (props) => {
    const {match, loading: {isLoading}, fluidWidth} = props;
    const mainClass = className({'col-md-9 col-lg-10': !fluidWidth}, {'col-md-12 col-lg-12': fluidWidth}, mainContentStyle.mainContent);
    return (
        <main className={mainClass}>
            <Breadcrumb/>
            <div className={mainContentStyle.panel}>
                {isLoading && <div className={mainContentStyle.panel__mask}><Spin size="large" tip="加载中..."/></div>}
                <ConnectedSwitch>
                    <Route exact path={`${match.path}`} component={DashboardView}/>
                    <Route exact path={`${match.path}/accountManagement`} component={AccountListView}/>
                    <Route exact path={`${match.path}/onlineLessons`} component={OnlineLessonsView}/>
                </ConnectedSwitch>
            </div>
        </main>
    );
};

Main.propTypes = {
    match: PropTypes.object,
    loading: PropTypes.object,
    fluidWidth: PropTypes.bool
};


export default connect(state => ({loading: state.loading}))(Main);
