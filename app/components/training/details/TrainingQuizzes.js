import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form';
import { Button, List, message, Divider } from 'antd';
import { DIALOG } from 'constants';
import classNames from 'classnames';
import { renderTextField, renderSwitch, renderCheckboxField } from '../../shared/form';
import style from './TrainingQuizzes.scss';
import TrainingQuizzesTable from './TrainingQuizzesTable';

@reduxForm({form: 'trainingQuizzes', enableReinitialize: true})
class TrainingQuizzes extends Component {
    openCustomizeExamDialog = () => {
        const {showDialog} = this.props;
        showDialog(DIALOG.TRAINING_CUSTOMIZE_EXAM)();
    }

    openLibExamDialog = () => {
        const {actions: {getLibExams}, showDialog} = this.props;
        getLibExams().then(() => showDialog(DIALOG.TRAINING_LIB_EXAM)());
    };

    listData = [{
        title: '随机测试',
        description: '设置用户练习时抽取的题目数量，数量不能为0并且不能超过题目总数',
        content: (
            <div className="row">
                <Field
                    rowClassName="col-md-6"
                    layout="elementOnly"
                    addonBefore="随机题数"
                    name="examAmount"
                    component={renderTextField}
                    type="text"
                    placeholder="随机题数"
                />
                <Field
                    rowClassName="col-md-6"
                    layout="elementOnly"
                    name="examPassRate"
                    addonBefore="合格率（%）"
                    component={renderTextField}
                    type="text"
                    placeholder="合格率（%）"
                />
            </div>
        )
    }, {
        title: '增加课后测试题',
        content: (
            <div>
                <Button onClick={this.openLibExamDialog} type="primary" className="editable-add-btn" ghost>题库选择</Button>
                <Button onClick={this.openCustomizeExamDialog} type="primary" className="editable-add-btn" ghost>自制测试题</Button>
            </div>
        )
    }]

    updateDraftCourse = (values) => {
        const {actions: {saveTrainingsExamConfig}, trainings} = this.props;
        const trainingID = trainings?.trainingDetails?.id;
        values.summaryOn?values.summaryOn=1:values.summaryOn=0;
        values.surveyOn?values.surveyOn=1:values.surveyOn=0;
        saveTrainingsExamConfig(trainingID, values)
            .then(() => {message.success('保存课后测试成功！');})
            .catch(() => {message.success('保存课后测试失败！');});
    }

    render() {
        const { submitting, handleSubmit, examInfoList, actions, trainings, showDialog } = this.props;
        const examContainer = classNames('row inputRow', style.traningExamContainer);
        const hasExamList = examInfoList && examInfoList.elements.length > 0;
        const trainingId = trainings?.trainingDetails?.id;
        return (
            <Form onSubmit={handleSubmit(this.updateDraftCourse)}>
                <Field
                    name="summaryOn"
                    className="col-md-6 col-lg-6 u-push-right-xs"
                    rowClassName="inputRow"
                    component={renderSwitch}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    defaultChecked
                    label="培训小结"
                    title="培训小结"
                />

                <Field
                    className="col-md-6 col-lg-6 u-push-right-xs"
                    rowClassName="inputRow"
                    name="ccLeader"
                    defaultChecked={false}
                    component={renderCheckboxField}
                    type="text"
                    label="抄送领导"
                />

                <Field
                    name="surveyOn"
                    className="col-md-8 col-lg-6 u-push-right-xs"
                    rowClassName="inputRow"
                    component={renderSwitch}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    defaultChecked
                    label="课后问卷"
                    title="课后满意度问卷"
                />
                <div className={examContainer}>
                    <label htmlFor="sectionButton" className="col-md-2 col-lg-1">课后测试</label>
                    <div className="col-md-8 col-lg-6">
                        <List
                            itemLayout="vertical"
                            dataSource={this.listData}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.title}
                                        description={item.description}
                                    />
                                    {item.content}
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
                <div className="row inputRow">
                    <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1">
                        <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                    </div>
                </div>

                <Divider/>

                {
                    hasExamList &&
                    <TrainingQuizzesTable
                        traniningId={trainingId}
                        actions={actions}
                        showDialog={showDialog}
                        dataSource={examInfoList}
                    />
                }
            </Form>
        );
    }
}

TrainingQuizzes.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    handleSubmit: PropTypes.func,
    showDialog: PropTypes.func,
    // dispatch: PropTypes.func,
    examInfoList: PropTypes.object,
    trainings: PropTypes.object,
    submitting: PropTypes.bool
};

export default TrainingQuizzes;
