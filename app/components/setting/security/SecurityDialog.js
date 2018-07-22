import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset, submit, SubmissionError } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button, message } from 'antd';
import { paginationSetting } from 'utils';
import { renderTextField, CheckBoxGroupField } from '../../shared/form';

const required = value => (value ? undefined : '不能为空！');


@reduxForm({form: DIALOG.SECURITY_SETTING})
class SecurityDialog extends Component {
    static dialogName = DIALOG.SECURITY_SETTING;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.SECURITY_SETTING));
        this.props.dispatch(reset(DIALOG.SECURITY_SETTING));
        this.props.hideDialog(DIALOG.SECURITY_SETTING)();
    }

    renderCostsOptions = () => {
        const costs = ['主管', '普工', '高级经理', '总监', '经理'];
        return costs.map(item => ({label: item, value: item}));
    }

    submit= (values) => {
        const {actions: {createSecretLevel, getList}} = this.props;
        const params = {
            dicType: 'LIMIT_TYPE',
            dictionaryCreates: [{
                name: values.name.join(','),
                code: values.code
            }]
        };
        return createSecretLevel(params)
            .then(() => {
                message.success(`创建保密权限种类${values.title}成功！`);
                this.closeDialog();
                getList({pageSize: paginationSetting.pageSize, dicType: 'LIMIT_TYPE'});
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || `创建保密权限种类${values.title}失败！`
                });
            });
    }

    render() {
        const {submitting, handleSubmit, visible, width, error, dispatch} = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="新建保密权限种类"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.SECURITY_SETTING))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form onSubmit={handleSubmit(this.submit)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">
                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="code"
                            component={renderTextField}
                            type="text"
                            placeholder="种类名称"
                            label="种类名称"
                            validate={required}
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="name"
                            options={this.renderCostsOptions()}
                            component={CheckBoxGroupField}
                            type="text"
                            placeholder="对应权限级别"
                            label="对应权限级别"
                        />
                    </div>
                </Form>
            </Modal>
        );
    }
}

SecurityDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default SecurityDialog;
