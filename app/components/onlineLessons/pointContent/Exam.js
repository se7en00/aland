import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from 'antd';
import { reduxForm, Field, Form } from 'redux-form';
import classNames from 'classnames';
import { DIALOG } from 'constants';
import ExamTable from './ExamTable';
import { renderTextField, renderSwitch } from '../../shared/form';
import style from './Exam.scss';


@reduxForm({form: 'examContents', enableReinitialize: true})
class Exam extends Component {
    openLibExamDialog = () => {
        const {actions: {getLibExams}, showDialog} = this.props;
        getLibExams().then(() => showDialog(DIALOG.LIB_EXAM)());
    }

    submit = (values) => {
        values.examOn = +values.examOn;
        const { courseId, pointId } = this.props?.point?.pointContent;
        this.props.actions.updateExams(courseId, pointId, values);
    }

    componentDidMount() {
        this.props.actions.getCategories();
    }

    render() {
        const { handleSubmit, submitting, showDialog, point, actions, examInfoList } = this.props;
        const testClass = classNames('col-md-12 col-lg-12', style.examTest);
        const switchClass = classNames('col-md-12 col-lg-12', style.switchContainer);
        const hasExamList = examInfoList && examInfoList.length > 0;
        return (
            <Form onSubmit={handleSubmit(this.submit)}>
                <div className="row inputRow">
                    <div className={switchClass}>
                        <Field
                            layout="elementOnly"
                            name="examOn"
                            className="u-push-right-xs"
                            component={renderSwitch}
                            checkedChildren="开启"
                            unCheckedChildren="关闭"
                            onChange={this.handleSwitchChange}
                            defaultChecked
                        />
                        <span className="title">课程点学习完后做测试题</span>
                    </div>
                    <div className={testClass}>
                        <label htmlFor="sectionButton">随机测试：</label>
                        <Field
                            rowClassName="col-md-4"
                            layout="elementOnly"
                            addonBefore="随机题数"
                            name="examAmount"
                            component={renderTextField}
                            type="text"
                            placeholder="随机题数"
                        />
                        <Field
                            rowClassName="col-md-4"
                            layout="elementOnly"
                            name="examPassRate"
                            addonBefore="合格率（%）"
                            component={renderTextField}
                            type="text"
                            placeholder="合格率（%）"
                        />
                    </div>
                    <div className="col-md-12 col-lg-12">
                        设置用户练习时抽取的题目数量，数量不能为0并且不能超过题目总数；
                    </div>
                    <Divider/>
                </div>

                <div className="row">
                    <div className="col-md-8 col-lg-6">
                        <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                        <Button onClick={this.openLibExamDialog} type="primary" className="editable-add-btn" ghost>题库选择</Button>
                        <Button type="primary" onClick={showDialog(DIALOG.CUSTOMIZE_EXAM)} className="editable-add-btn" ghost>自制测试题</Button>
                    </div>
                </div>

                {
                    hasExamList &&
                    <ExamTable
                        courseId={point?.pointContent?.courseId}
                        pointId={point?.pointContent?.pointId}
                        actions={actions}
                        showDialog={showDialog}
                        dataSource={examInfoList}
                    />
                }
            </Form>
        );
    }
}

Exam.propTypes = {
    showDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    point: PropTypes.object,
    examInfoList: PropTypes.array,
    actions: PropTypes.objectOf(PropTypes.func)
};

export default Exam;
