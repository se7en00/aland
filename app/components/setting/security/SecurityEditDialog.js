import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset, submit, SubmissionError } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button, message } from 'antd';
import { paginationSetting } from 'utils';
import { connect } from 'react-redux';
import { renderTextField, CheckBoxGroupField } from '../../shared/form';

const required = value => (value ? undefined : '不能为空！');

const mapStateToProp = (state) => {
    if (R.isEmpty(state.setting) || !state?.setting?.typeDetails) return null;
    const { typeDetails } = state.setting;
    return {
        id: typeDetails.id,
        initialValues: {
            code: typeDetails.code,
            name: typeDetails.name.split(',')
        }
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.SECURITY_SETTING_DETAILS, enableReinitialize: true})
class SecurityDialog extends Component {
    static dialogName = DIALOG.SECURITY_SETTING_DETAILS;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.SECURITY_SETTING_DETAILS));
        this.props.dispatch(reset(DIALOG.SECURITY_SETTING_DETAILS));
        this.props.hideDialog(DIALOG.SECURITY_SETTING_DETAILS)();
    }

    renderCostsOptions = () => {
        const costs = ['主管', '普工', '高级经理', '总监', '经理'];
        return costs.map(item => ({label: item, value: item}));
    }

    submit= (values) => {
        const {actions: {editSecretLevel, getList}} = this.props;
        const params = {
            name: values.name.join(','),
            code: values.code
        };
        return editSecretLevel(this.props.id, params)
            .then(() => {
                message.success(`修改保密权限种类${values.code}成功！`);
                this.closeDialog();
                getList({pageSize: paginationSetting.pageSize, dicType: 'LIMIT_TYPE'});
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || `修改保密权限种类${values.code}失败！`
                });
            });
    }

    render() {
        const {submitting, handleSubmit, visible, width, error, dispatch} = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="修改保密权限种类"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.SECURITY_SETTING_DETAILS))} loading={submitting} type="primary">保存</Button>,
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
                            component={CheckBoxGroupField}
                            type="text"
                            options={this.renderCostsOptions()}
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
    id: PropTypes.string,
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
