import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Menu, Dropdown, Button, Icon } from 'antd';
import uuid from 'uuid/v4';
import OnlineLessonDetails from './OnlineLessonDetails';
import OnlineLessonNode from './OnlineLessonNodes';
import OnlineLessonQuizzes from './OnlineLessonQuizzes';
import OnlineLessonTags from './OnlineLessonTags';

class OnlineLessonTab extends Component {
    handleChange = () => {
        console.log('222');
    };

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
        const {draftOnlineLesson, showDialog, actions} = this.props;
        return (
            <Tabs defaultActiveKey="1" onChange={this.handleChange} tabBarExtraContent={this.reviewOperation}>
                <TabPane tab={<span><Icon type="profile"/>课程详情</span>}key="1">
                    <OnlineLessonDetails
                        actions={actions}
                        draftOnlineLesson={draftOnlineLesson}
                        initialValues={this.initDetailsValues(draftOnlineLesson?.draftLesson)}
                    />
                </TabPane>
                <TabPane tab={<span><i style={{marginRight: '8px'}} className="fas fa-project-diagram"/>课程内容</span>} key="2">
                    <OnlineLessonNode
                        actions={actions}
                        draftOnlineLesson={draftOnlineLesson}
                        showDialog={showDialog}
                    />
                </TabPane>
                <TabPane tab={<span><Icon type="book"/>课后测试</span>} key="3">
                    <OnlineLessonQuizzes/>
                </TabPane>
                <TabPane tab={<span><Icon type="tags-o"/>标签</span>} key="4">
                    <OnlineLessonTags/>
                </TabPane>
            </Tabs>
        );
    }
}

OnlineLessonTab.propTypes = {
    draftOnlineLesson: PropTypes.object,
    showDialog: PropTypes.func,
    actions: PropTypes.objectOf(PropTypes.func)
};
OnlineLessonTab.defaultProps = {};

export default OnlineLessonTab;
