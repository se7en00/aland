import React from 'react';
import { connect } from 'react-redux';
import { loadDashboard } from './dashboardAction';
import List from './PanelList';

@connect(state => ({list: state.dashboard}), {loadDashboard})
class DashboardView extends React.Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <List {...this.props}/>
            </div>
        );
    }
}

export default DashboardView;
