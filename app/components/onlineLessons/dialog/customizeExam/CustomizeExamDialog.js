import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset, submit} from 'redux-form';
import { DIALOG, renderOptions } from 'constants/index';
import classNames from 'classnames';
import { Modal, Button, Radio } from 'antd';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { renderTextField, renderCheckboxField, renderSelectField } from '../../../shared/form/index';
import style from './CustomizeExamDialog.scss';


const RadioGroup = Radio.Group;

@connect(state => ({categoryList: state.point?.categoryList}))
@reduxForm({form: DIALOG.CUSTOMIZE_EXAM})
class CustomizeExamDialog extends Component {
    static dialogName = DIALOG.CUSTOMIZE_EXAM;

    state = {
        value: 'SINGLE',
        rows: []
    }

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.CUSTOMIZE_EXAM));
        this.props.dispatch(reset(DIALOG.CUSTOMIZE_EXAM));
        this.props.hideDialog(DIALOG.CUSTOMIZE_EXAM)();
    }

    onTypeChange = (e) => {
        this.setState({
            value: e.target.value
        });
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
        const index = rows.findIndex(item => item === row);
        if (index > -1) {
            rows.splice(index, 1);
            this.setState({rows});
        }
    }

    renderQuestionContent = () => {
        const tdClassName = classNames('u-text-center', style.customizeTable);
        const {rows} = this.state;
        // const handleChange = (event) => {
        //     console.log(event);
        // };

        return (
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
                                name={`${row}.content`}
                                style={{alignItems: 'flex-start'}}
                                component={renderTextField}
                                rows={2}
                                type="textarea"
                                placeholder="输入答案内容"
                            />
                        </td>
                        <td className={tdClassName}>
                            <Field
                                layout="elementOnly"
                                defaultChecked={false}
                                component={renderCheckboxField}
                                type="radio"
                            />
                        </td>
                        <td>
                            <Button type="primary" onClick={this.removeRow(row)} ghost><i className="far fa-trash-alt"/></Button>
                        </td>
                    </tr>
                ))}
            </Fragment>);
    }

    submit = (values) => {
        console.log(values);
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
                        onClick={() => dispatch(submit(DIALOG.CUSTOMIZE_EXAM))}
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
                        name="loginName"
                        component={renderTextField}
                        type="text"
                        placeholder="题目"
                        label="题目"
                    />

                    <Field
                        labelClassName="col-md-2"
                        className="col-md-8"
                        rowClassName="dialogContainer__inputRow"
                        name="categoryCode"
                        component={renderSelectField}
                        placeholder="种类"
                        label="种类"
                    >
                        {this.renderCategoryOptions()}
                    </Field>

                    <div className="row dialogContainer__inputRow" style={{alignItems: 'flex-start'}}>
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

CustomizeExamDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    // actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    categoryList: PropTypes.array,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default CustomizeExamDialog;
