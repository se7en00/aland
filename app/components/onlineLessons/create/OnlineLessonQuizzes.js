import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form';
import { Button, List, message, Divider } from 'antd';
import { DIALOG } from 'constants';
import classNames from 'classnames';
import { renderTextField, renderSwitch } from '../../shared/form';
import style from './OnlineLessonQuizzes.scss';
import OnlineLessonQuizzesTable from './OnlineLessonQuizzesTable';

@reduxForm({form: 'onlineLessonsQuizzes', enableReinitialize: true})
class OnlineLessonQuizzes extends Component {
    handleExamSwitchChange = (e, value) => {
        const {actions: {examAllowCourse}} = this.props;
        examAllowCourse(value);
    }

    listData = [{
        title: '题目来源',
        content: (
            <Fragment>
                <Field
                    layout="elementOnly"
                    name="examAllowNode"
                    className="u-push-right-xs"
                    component={renderSwitch}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    defaultChecked
                    title="直接引用章节中的测试题作为课后测试"
                />
                <Field
                    layout="elementOnly"
                    name="examAllowCourse"
                    className="u-push-right-xs u-pull-down-sm"
                    component={renderSwitch}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    title="制作课后测试题"
                    onChange={this.handleExamSwitchChange}
                    defaultChecked
                />
            </Fragment>

        )
    }, {
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
    }]

    openCustomizeExamDialog = () => {
        const {showDialog} = this.props;
        showDialog(DIALOG.COURSE_CUSTOMIZE_EXAM)();
    }

    openLibExamDialog = () => {
        const {actions: {getLibExams}, showDialog} = this.props;
        getLibExams().then(() => showDialog(DIALOG.COURSE_LIB_EXAM)());
    };

    componentWillUpdate(nextProps) {
        if (nextProps.initialValues.examAllowCourse) {
            const hasExams = this.listData.filter(item => item.title === '新建课后测试题');
            if (!hasExams || hasExams.length === 0) {
                this.listData.splice(1, 0, {
                    title: '新建课后测试题',
                    content: (
                        <div>
                            <Button onClick={this.openLibExamDialog} type="primary" className="editable-add-btn" ghost>题库选择</Button>
                            <Button onClick={this.openCustomizeExamDialog} type="primary" className="editable-add-btn" ghost>自制测试题</Button>
                        </div>
                    )
                });
            }
        } else {
            if (this.listData.length === 3) { //eslint-disable-line
                this.listData.splice(1, 1);
            }
        }
    }

    updateDraftCourse = (values) => {
        const {actions: {createDraftOnlineLesson}, draftOnlineLesson} = this.props;
        const courseID = draftOnlineLesson?.draftLesson?.id;
        const params = Object.assign({}, draftOnlineLesson?.draftLesson, values);
        createDraftOnlineLesson(courseID, params)
            .then(() => {message.success('保存课后测试成功！');})
            .catch(() => {message.success('保存课后测试失败！');});
    }

    render() {
        const { submitting, handleSubmit, examInfoList, actions, draftOnlineLesson } = this.props;
        const examContainer = classNames('row inputRow', style.examContainer);
        const hasExamList = examInfoList && examInfoList.length > 0;
        const courseId = draftOnlineLesson?.draftLesson?.id;
        return (
            <Form onSubmit={handleSubmit(this.updateDraftCourse)}>
                <Field
                    name="needInquiry"
                    className="col-md-8 col-lg-6 u-push-right-xs"
                    rowClassName="inputRow"
                    component={renderSwitch}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    onChange={this.handleSwitchChange}
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
                    <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1 u-text-right">
                        <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                    </div>
                </div>

                <Divider/>

                {
                    hasExamList &&
                    <OnlineLessonQuizzesTable
                        courseId={courseId}
                        actions={actions}
                        dataSource={examInfoList}
                    />
                }
            </Form>
        );
    }
}

OnlineLessonQuizzes.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    handleSubmit: PropTypes.func,
    showDialog: PropTypes.func,
    // dispatch: PropTypes.func,
    examInfoList: PropTypes.array,
    initialValues: PropTypes.object,
    draftOnlineLesson: PropTypes.object,
    submitting: PropTypes.bool
};

export default OnlineLessonQuizzes;
