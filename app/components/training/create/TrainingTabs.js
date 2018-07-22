import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Menu, Dropdown, Button, Icon } from 'antd';
import uuid from 'uuid/v4';
import TrainingDetails from '../details/TrainingDetails';

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

    initDetailsValues = (values) => {
        if (!values) return null;
        const {name, categoryCode, introduce, benefit, cover} = values;
        const result = {name, categoryCode, introduce, benefit, cover: [cover]};
        if (values.lecturerId || values.lecturerName) {
            Object.assign(result, {lecturerId: {key: values.lecturerId, label: values.lecturerName}});
        }
        if (values.provideId || values.provide) {
            Object.assign(result, {provideId: {key: values.provideId, label: values.provide}});
        }
        return result;
    }

    render() {
        const TabPane = Tabs.TabPane;
        const {trainings, actions} = this.props;
        // const isDisabledTrainings = !trainings?.trainingsDetails;
        // let options;
        // if (trainings.courseDirections) {
        //     options = trainings.courseDirections.map(item => {
        //         const params = {
        //             value: item.
        //         }
        //     });
        // }
        return (
            /*<Tabs defaultActiveKey="1" onChange={this.handleChange} tabBarExtraContent={this.reviewOperation}>*/
            <Tabs defaultActiveKey="1">
                <TabPane tab="培训信息" key="1">
                    <TrainingDetails
                        actions={actions}
                        trainings={trainings}
                    />
                </TabPane>
            </Tabs>
        );
    }
}

TrainingTabs.propTypes = {
    trainings: PropTypes.object,
    // showDialog: PropTypes.func,
    actions: PropTypes.objectOf(PropTypes.func)
};

export default TrainingTabs;
