import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';
import StudyContents from './StudyContents';
import HomeWork from './HomeWork';
import Exam from './Exam';
import MultiMaterials from './MultiMaterials';
import DownMaterials from './DownMaterials';

class PointContentTab extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        showDialog: PropTypes.func,
        point: PropTypes.object
    }

    handleChange = (key) => {
        if (key === '4') {
            this.props.actions.setMaterialsType('OL');
        }

        if (key === '5') {
            this.props.actions.setMaterialsType('DL');
        }
    }

    initStudyValues = (point, videoType) => {
        if (R.isEmpty(point) || !point?.pointContent) return;
        const param = {
            content: point.pointContent.content
        };
        const isMatch = /^\/upload/.test(point.pointContent.link);
        if (!isMatch) {
            param.url = point.pointContent.link;
        }
        return param;
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
        const videoType = point?.videoType || '0';
        return (
            <Tabs defaultActiveKey="1" onChange={this.handleChange} tabBarExtraContent={this.reviewOperation}>
                <TabPane tab={<span><Icon type="profile"/>学习内容</span>} key="1">
                    <StudyContents
                        point={point}
                        videoType={videoType}
                        actions={actions}
                        showDialog={showDialog}
                        initialValues={this.initStudyValues(point, videoType)}
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
                    <MultiMaterials
                        point={point}
                        actions={actions}
                        materialsList={point?.olMaterials}
                        showDialog={showDialog}
                    />
                </TabPane>
                <TabPane tab={<span><Icon type="tags-o"/>下载资料</span>} key="5">
                    <DownMaterials
                        point={point}
                        actions={actions}
                        materialsList={point?.dlMaterials}
                        showDialog={showDialog}
                    />
                </TabPane>
            </Tabs>
        );
    }
}

export default PointContentTab;
