import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from 'antd';
import { reduxForm, Field, Form } from 'redux-form';
import classNames from 'classnames';
import ExamTable from './ExamTable';
import { renderTextField, renderSwitch } from '../../shared/form';
import style from './Exam.scss';

@reduxForm({form: 'examContents', enableReinitialize: true})
class Exam extends Component {
    state = {
        isDisabled: false
    }

    handleSwitchChange = (event, checked) => {
        this.setState({isDisabled: !checked});
    }

    render() {
        const {isDisabled} = this.state;
        const { handleSubmit, submitting, showDialog, point, actions } = this.props;
        const testClass = classNames('col-md-12 col-lg-12', style.examTest);
        const switchClass = classNames('col-md-12 col-lg-12', style.switchContainer);
        return (
            <Form onSubmit={handleSubmit}>
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
                            disabled={isDisabled}
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
                            disabled={isDisabled}
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
                        <Button disabled={isDisabled} type="primary" className="editable-add-btn" ghost>题库选择</Button>
                        <Button disabled={isDisabled} type="primary" className="editable-add-btn" ghost>自制测试题</Button>
                    </div>
                </div>

                <ExamTable
                    courseId={point?.pointContent?.courseId}
                    actions={actions}
                    showDialog={showDialog}
                    dataSource={point.homeWorks.elements}
                />

                <div className="row inputRow">
                    <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1 u-text-right">
                        <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                    </div>
                </div>
            </Form>
        );
    }
}

Exam.propTypes = {
    showDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    point: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func)
};

export default Exam;
