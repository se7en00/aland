import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Menu, Dropdown, Button, Icon } from 'antd';
import uuid from 'uuid/v4';
import OnlineLessonDetails from './OnlineLessonDetails';
import OnlineLessonNode from './OnlineLessonNodes';
import OnlineLessonQuizzes from './OnlineLessonQuizzes';

class OnlineLessonTab extends Component {
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

    initExamValues = (values) => {
        if (!values) return null;
        const {needInquiry = 'false', examAllowNode = 'false', examAllowCourse = 'false', examAmount = '', examPassRate = ''} = values;
        const params = {
            needInquiry: needInquiry === 'true',
            examAllowNode: examAllowNode === 'true',
            examAllowCourse: examAllowCourse === 'true',
            examAmount,
            examPassRate
        };
        if (Object.hasOwnProperty.call(this.props.draftOnlineLesson, 'enableCourseExam')) {
            params.examAllowCourse = this.props.draftOnlineLesson.enableCourseExam;
        }
        return params;
    }

    render() {
        const TabPane = Tabs.TabPane;
        const {draftOnlineLesson, showDialog, actions} = this.props;
        const isDisabledLesson = !draftOnlineLesson?.draftLesson;
        return (
            /*<Tabs defaultActiveKey="1" onChange={this.handleChange} tabBarExtraContent={this.reviewOperation}>*/
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="profile"/>基本信息</span>} key="1">
                    <OnlineLessonDetails
                        actions={actions}
                        draftOnlineLesson={draftOnlineLesson}
                        initialValues={this.initDetailsValues(draftOnlineLesson?.draftLesson)}
                    />
                </TabPane>
                <TabPane
                    disabled={isDisabledLesson}
                    tab={<span><i style={{marginRight: '8px'}} className="fas fa-project-diagram"/>课程内容</span>}
                    key="2">
                    <OnlineLessonNode
                        actions={actions}
                        draftOnlineLesson={draftOnlineLesson}
                        showDialog={showDialog}
                    />
                </TabPane>
                <TabPane
                    disabled={isDisabledLesson}
                    tab={<span><Icon type="book"/>课后测试</span>}
                    key="3">
                    <OnlineLessonQuizzes
                        actions={actions}
                        showDialog={showDialog}
                        draftOnlineLesson={draftOnlineLesson}
                        examInfoList={draftOnlineLesson?.exams}
                        initialValues={this.initExamValues(draftOnlineLesson?.draftLesson)}
                    />
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
