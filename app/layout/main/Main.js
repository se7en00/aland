import React from 'react';
import {ConnectedSwitch} from 'routes';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import className from 'classnames';
import { Dashboard } from 'components/dashboard/';
import { UserListView } from 'components/userList';
import mainContentStyle from './Main.scss';
import Breadcrumb from './BreadCrumb';

const Main = (props) => {
    const {match, loading} = props;
    const mainClass = className('col-md-9 col-lg-10', mainContentStyle.mainContent);
    return (
        <main className={mainClass}>
            <Breadcrumb/>
            <div className={mainContentStyle.panel}>
                {loading && <div className={mainContentStyle.panel__mask}><Spin size="large" tip="加载中..."/></div>}
                <ConnectedSwitch>
                    <Route exact path={`${match.path}`} component={Dashboard}/>
                    <Route exact path={`${match.path}accountManagement`} component={UserListView}/>
                </ConnectedSwitch>
            </div>
        </main>
    );
};

Main.propTypes = {
    match: PropTypes.object,
    loading: PropTypes.bool
};


export default connect(state => ({loading: state.loading}))(Main);
