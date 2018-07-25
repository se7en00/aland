import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Menu, Dropdown, Button, Icon } from 'antd';
import uuid from 'uuid/v4';
import TaskDetails from '../details/TaskDetails';
import TaskLessons from '../details/TaskLessons';

class TaskTabs extends Component {
    buttonMenu = () => (
        <Menu >
            <Menu.Item key={uuid()}><i className="fas fa-desktop u-push-right-xs"/>PC预览</Menu.Item>
            <Menu.Item key={uuid()}><i className="fas fa-mobile-alt u-push-right-xs"/>手机预览</Menu.Item>
        </Menu>
    );

    reviewOperation = (
        <Dropdown overlay={this.buttonMenu()}>
            <Button type="primary" icon="eye-o">预览 <Icon type="down"/></Button>
        </Dropdown>
    );

    render() {
        const TabPane = Tabs.TabPane;
        const {tasks, tasks: {associations}, actions, showDialog} = this.props;
        const isCreated = !tasks?.taskDetails;
        return (
            /*<Tabs defaultActiveKey="1" onChange={this.handleChange} tabBarExtraContent={this.reviewOperation}>*/
            <Tabs defaultActiveKey="1">
                <TabPane tab="基本信息" key="1">
                    <TaskDetails
                        actions={actions}
                        tasks={tasks}
                        associations={associations}
                    />
                </TabPane>

                <TabPane tab="课件" key="2" disabled={isCreated}>
                    <TaskLessons
                        actions={actions}
                        tasks={tasks}
                        showDialog={showDialog}
                        associations={associations}
                    />
                </TabPane>
            </Tabs>
        );
    }
}

TaskTabs.propTypes = {
    tasks: PropTypes.object,
    showDialog: PropTypes.func,
    actions: PropTypes.objectOf(PropTypes.func)
};

export default TaskTabs;
