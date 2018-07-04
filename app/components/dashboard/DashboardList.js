import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Panel from './DashboardItem';

class DashboardList extends Component {
    static propTypes = {
        loadDashboard: PropTypes.func,
        dashboard: PropTypes.object
    };

    componentDidMount() {
        this.props.loadDashboard();
    }

    render() {
        const TabPane = Tabs.TabPane;
        const {today, yesterday, all} = this.props?.dashboard;
        return (
            <Tabs defaultActiveKey="1" onChange={this.handleChange} tabBarExtraContent={this.reviewOperation}>
                <TabPane tab="今天" key="1">
                    <Panel details={today}/>
                </TabPane>
                <TabPane tab="昨天" key="2">
                    <Panel details={yesterday}/>
                </TabPane>
                <TabPane tab="总计" key="3">
                    <Panel details={all}/>
                </TabPane>
            </Tabs>
        );
    }
}

export default DashboardList;
