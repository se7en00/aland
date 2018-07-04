import React from 'react';
import { connect } from 'react-redux';
import { loadDashboard, DashboardList } from 'components/dashboard';

@connect(state => ({dashboard: state.dashboard}), {loadDashboard})
class DashboardView extends React.Component {
    render() {
        return (
            <DashboardList {...this.props}/>
        );
    }
}

export default DashboardView;
