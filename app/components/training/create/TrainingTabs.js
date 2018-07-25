import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Menu, Dropdown, Button, Icon } from 'antd';
import uuid from 'uuid/v4';
import TrainingDetails from '../details/TrainingDetails';
import Lessons from '../details/Lessons';
import TrainingUserList from '../details/TrainingUserList';

class TrainingTabs extends Component {
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
        const {trainings, trainings: {associations}, actions, showDialog} = this.props;
        const isCreated = !trainings?.trainingDetails;
        const isEditable = trainings.isEditable;
        return (
            /*<Tabs defaultActiveKey="1" onChange={this.handleChange} tabBarExtraContent={this.reviewOperation}>*/
            <Tabs defaultActiveKey="1">
                <TabPane tab="培训信息" key="1">
                    <TrainingDetails
                        actions={actions}
                        trainings={trainings}
                        associations={associations}
                    />
                </TabPane>
                <TabPane tab="课时" key="2" disabled={isCreated}>
                    <Lessons
                        showDialog={showDialog}
                        actions={actions}
                        lessons={trainings?.lessons}
                        trainings={trainings}
                    />
                </TabPane>
                <TabPane tab="测试题" key="3" disabled={isCreated}>
                    <TrainingDetails
                        actions={actions}
                        trainings={trainings}
                    />
                </TabPane>
                {
                    isEditable &&
                    <TabPane tab="培训人员" key="4" >
                        <TrainingUserList
                            dataSource={trainings?.users}
                            actions={actions}
                            trainings={trainings}
                        />
                    </TabPane>
                }

            </Tabs>
        );
    }
}

TrainingTabs.propTypes = {
    trainings: PropTypes.object,
    showDialog: PropTypes.func,
    actions: PropTypes.objectOf(PropTypes.func)
};

export default TrainingTabs;
