import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset, submit, SubmissionError } from 'redux-form';
import { DIALOG, renderOptions } from 'constants/index';
import classNames from 'classnames';
import { Modal, Button, Radio, message } from 'antd';
import uuid from 'uuid/v4';
import { resetSpecificField } from 'utils';
import { connect } from 'react-redux';
import { renderTextField, renderSelectField, renderCheckboxField } from '../../../shared/form/index';
import style from './CustomizeExamDialog.scss';

const required = value => (value ? undefined : '不能为空！');
const RadioGroup = Radio.Group;
const mapStateToProp = (state) => {
    if (R.isEmpty(state.draftOnlineLesson) || !state?.draftOnlineLesson?.draftLesson) return null;
    const { id: courseId } = state?.draftOnlineLesson?.draftLesson;
    return {
        courseId,
        categoryList: state.draftOnlineLesson?.categoryList
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.COURSE_CUSTOMIZE_EXAM})
class CustomizeExamDialogForCourse extends Component {
    static dialogName = DIALOG.COURSE_CUSTOMIZE_EXAM;

    state = {
        value: 'SINGLE',
        rows: [],
        isCorrect: true
    }

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.COURSE_CUSTOMIZE_EXAM));
        this.props.dispatch(reset(DIALOG.COURSE_CUSTOMIZE_EXAM));
        this.props.hideDialog(DIALOG.COURSE_CUSTOMIZE_EXAM)();
        this.setState({rows: [], value: 'SINGLE'});
    }

    onTypeChange = (e) => {
        const type = e.target.value;
        this.props.dispatch(reset(DIALOG.COURSE_CUSTOMIZE_EXAM));
        this.setState({
            value: type
        });
    }

    onTOFChange = (e) => {
        const isCorrect = e.target.value;
        this.setState({isCorrect: !!+isCorrect});
    }

    renderCategoryOptions = () => {
        const {categoryList = []} = this.props;
        return renderOptions('code', 'name')(categoryList);
    }

    addRow = () => {
        this.setState({rows: this.state.rows.concat([{content: '', checked: false}])});
    };

    removeRow = (row) => () => {
        const {rows} = this.state;
        const {dispatch} = this.props;
        const index = rows.findIndex(item => item === row);
        if (index > -1) {
            rows.splice(index, 1);
            rows.forEach((item, count) => {
                resetSpecificField(dispatch, DIALOG.COURSE_CUSTOMIZE_EXAM, `${item}.content_${count}`, item.content);
            });
            this.setState({rows});
        }
    }

    handleCheckBoxChange = (checked, selectedRow) => {
        const {value, rows} = this.state;
        const tempRows = rows.map(row => {
            if (value === 'SINGLE' || value === 'TOF') {
                row.checked = false;
            }
            if (row === selectedRow) {
                row.checked = checked;
            }
            return row;
        });

        this.setState({rows: tempRows});
    }

    renderQuestionContent = () => {
        let content = '';
        const tdClassName = classNames('u-text-center', style.customizeTable);
        const {rows, value} = this.state;
        if (value === 'FILL') {
            content = (
                <tr>
                    <td colSpan={3} className={tdClassName}>
                        <Field
                            layout="elementOnly"
                            className="col-md-12"
                            name="fillContent"
                            style={{alignItems: 'flex-start'}}
                            component={renderTextField}
                            rows={2}
                            type="textarea"
                            placeholder="输入答案内容"
                        />
                    </td>
                </tr>);
        } else if (value === 'TOF') {
            content = (
                <Fragment>
                    <tr key={uuid()}>
                        <td className={tdClassName}>
                            对的
                        </td>
                        <td className={tdClassName}>
                            <Radio value="1" checked={this.state.isCorrect} onChange={this.onTOFChange}/>
                        </td>
                        <td className={tdClassName}/>
                    </tr>
                    <tr key={uuid()}>
                        <td className={tdClassName}>
                            错的
                        </td>
                        <td className={tdClassName}>
                            <Radio value="0" checked={!this.state.isCorrect} onChange={this.onTOFChange}/>
                        </td>
                        <td className={tdClassName}/>
                    </tr>
                </Fragment>
            );
        } else {
            content = (
                <Fragment>
                    <tr>
                        <td colSpan="3" className={tdClassName}>
                            <Button onClick={this.addRow} icon="plus" type="primary" className="editable-add-btn" ghost>增加答案</Button>
                        </td>
                    </tr>
                    {rows.map((row, index) => (
                        <tr key={uuid()}>
                            <td className={tdClassName}>
                                <Field
                                    layout="elementOnly"
                                    className="col-md-12"
                                    name={`${row}.content_${index}`}
                                    style={{alignItems: 'flex-start'}}
                                    component={renderTextField}
                                    rows={2}
                                    onChange={(e, isChecked) => {row.content = isChecked;}}
                                    type="textarea"
                                    placeholder="输入答案内容"
                                />
                            </td>
                            <td className={tdClassName}>
                                <Field
                                    layout="elementOnly"
                                    checked={row.checked}
                                    name={`${row}.checked_${index}`}
                                    defaultChecked={false}
                                    component={renderCheckboxField}
                                    onChange={(e, isChecked) => {this.handleCheckBoxChange(isChecked, row);}}
                                    type="radio"
                                />
                            </td>
                            <td>
                                <Button type="primary" onClick={this.removeRow(row)} ghost><i className="far fa-trash-alt"/></Button>
                            </td>
                        </tr>
                    ))}
                </Fragment>
            );
        }
        return content;
    }

    submit = (values) => {
        const {rows, value, isCorrect} = this.state;
        const {actions: {createCustomizeExam}, courseId} = this.props;
        const answers = rows.map((row, index) => ({
            answerCode: String.fromCharCode(97 + index).toUpperCase(),
            answer: row.content,
            isCorrect: row.checked ? 1 : 0
        }));
        const answer = rows.filter(row => row.checked).map((result, index) => String.fromCharCode(97 + index).toUpperCase()).join(',');
        const params = {
            type: value,
            source: 'CUSTOMIZE',
            question: values.question,
            categoryCode: values.categoryCode
        };
        if (value === 'TOF') {
            params.answer = isCorrect ? 1 : 0;
        } else if (value === 'FILL') {
            params.answer = values.fillContent;
        } else {
            Object.assign(params, {answers, answer});
        }
        return createCustomizeExam(courseId, params)
            .then(() => {
                message.success(`创建自制测试题${values.question}成功！`);
                this.closeDialog();
            })
            .catch((error) => {
                throw new SubmissionError({
                    _error: error?.errorMessage || `创建自制测试题${values.question}失败`
                });
            });
    };

    render() {
        const {submitting, handleSubmit, visible, width, error, dispatch} = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="自制测试题"
                onCancel={this.closeDialog}
                footer={[
                    <Button
                        key="submit"
                        onClick={() => dispatch(submit(DIALOG.COURSE_CUSTOMIZE_EXAM))}
                        loading={submitting}
                        type="primary"
                    >
                        保存
                    </Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form name="editform" onSubmit={handleSubmit(this.submit)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}
                    <div className="row dialogContainer__inputRow">
                        <div className="col-md-8 offset-md-2">
                            <RadioGroup onChange={this.onTypeChange} value={this.state.value}>
                                <Radio value="SINGLE">单选题</Radio>
                                <Radio value="MULTIPLE">多选题</Radio>
                                <Radio value="FILL">填空题</Radio>
                                <Radio value="TOF">判断题</Radio>
                            </RadioGroup>
                        </div>
                    </div>


                    <Field
                        labelClassName="col-md-2"
                        className="col-md-8"
                        rowClassName="dialogContainer__inputRow"
                        name="question"
                        component={renderTextField}
                        type="text"
                        placeholder="题目"
                        label="题目"
                        validate={required}
                    />

                    <Field
                        labelClassName="col-md-2"
                        className="col-md-8"
                        rowClassName="dialogContainer__inputRow"
                        name="categoryCode"
                        component={renderSelectField}
                        placeholder="种类"
                        label="种类"
                        validate={required}
                    >
                        {this.renderCategoryOptions()}
                    </Field>

                    <div className="row dialogContainer__inputRow" style={{alignItems: 'flex-start'}}>
                        {/*{tableError && <span className="col-md-12 col-lg-12 error u-text-center">{tableError}</span>}*/}
                        <label htmlFor="s" className="col-md-2">答案</label>
                        <div className="col-md-8">
                            <div className="ant-table-wrapper">
                                <div className="ant-spin-nested-loading">
                                    <div className="ant-table ant-table-middle ant-table-bordered ant-table-scroll-position-left">
                                        <div className="ant-table-content">
                                            <div className="ant-table-body">
                                                <table>
                                                    <thead className="ant-table-thead">
                                                        <tr>
                                                            <th className="u-text-center">答案内容</th>
                                                            <th className="u-text-center">正确答案</th>
                                                            <th className="u-text-center">操作</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {this.renderQuestionContent()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Modal>
        );
    }
}

CustomizeExamDialogForCourse.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    categoryList: PropTypes.array,
    courseId: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default CustomizeExamDialogForCourse;
