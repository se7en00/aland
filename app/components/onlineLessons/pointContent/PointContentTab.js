import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';
import StudyContents from './StudyContents';
import HomeWork from './HomeWork';
import Exam from './Exam';

class PointContentTab extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        showDialog: PropTypes.func,
        point: PropTypes.object
    }

    initStudyContentsValues = (point) => {
        const {pointContent} = point;
        switch (pointContent?.type) {
        case 'LINK':
            return {
                type: pointContent.type,
                url: pointContent.link
            };
        case 'UPLOAD':
            return {
                type: pointContent.type,
                files: pointContent.link
            };
        case 'PEDIA':
            return {
                type: pointContent.type,
                pedias: {key: pointContent?.link, label: pointContent?.pediaSubject},
                prediaContent: pointContent.content
            };
        default:
            return {
                type: pointContent?.type || 'ARTICLE',
                content: pointContent?.content
            };
        }
    }

    initExamValues = (point) => {
        const {exams} = point;
        return {
            examOn: !!+exams?.examOn,
            examAmount: exams?.examAmount,
            examPassRate: exams?.examPassRate
        };
    }

    render() {
        const TabPane = Tabs.TabPane;
        const {point, actions, showDialog} = this.props;
        return (
            <Tabs defaultActiveKey="1" onChange={this.handleChange} tabBarExtraContent={this.reviewOperation}>
                <TabPane tab={<span><Icon type="profile"/>学习内容</span>} key="1">
                    <StudyContents
                        point={point}
                        actions={actions}
                        showDialog={showDialog}
                        initialValues={this.initStudyContentsValues(point)}
                    />
                </TabPane>
                <TabPane tab={<span><i style={{marginRight: '8px'}} className="fas fa-project-diagram"/>课内作业</span>} key="2">
                    <HomeWork
                        point={point}
                        actions={actions}
                        showDialog={showDialog}
                    />
                </TabPane>
                <TabPane tab={<span><Icon type="book"/>测试题</span>} key="3">
                    <Exam
                        point={point}
                        examInfoList={point?.exams?.courseExamInfos}
                        actions={actions}
                        showDialog={showDialog}
                        initialValues={this.initExamValues(point)}
                    />
                </TabPane>
                <TabPane tab={<span><Icon type="tags-o"/>学习资料</span>} key="4">
                    4
                </TabPane>
                <TabPane tab={<span><Icon type="tags-o"/>下载资料</span>} key="5">
                    4
                </TabPane>
            </Tabs>
        );
    }
}

export default PointContentTab;
