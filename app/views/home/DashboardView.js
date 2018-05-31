import React from 'react';
import { connect } from 'react-redux';
import { loadDashboard, DashboardList } from 'components/dashboard';

@connect(state => ({list: state.dashboard}), {loadDashboard})
class DashboardView extends React.Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <DashboardList {...this.props}/>
            </div>
        );
    }
}

export default DashboardView;
