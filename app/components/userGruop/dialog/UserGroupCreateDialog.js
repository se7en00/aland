import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset, submit, SubmissionError } from 'redux-form';
import { DIALOG, renderOptions } from 'constants';
import { Modal, Button, message } from 'antd';
import { paginationSetting, resetSpecificField } from 'utils';
import { renderTextField } from '../../shared/form';
import AutoSelectSearch from '../../shared/autoSearch/AutoSelectSearch';

const required = value => (value ? undefined : '不能为空！');

@reduxForm({form: DIALOG.CREATE_USER_GROUP})
class UserGroupCreateDialog extends Component {
    static dialogName = DIALOG.CREATE_USER_GROUP;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.CREATE_USER_GROUP));
        this.props.dispatch(reset(DIALOG.CREATE_USER_GROUP));
        this.props.hideDialog(DIALOG.CREATE_USER_GROUP)();
    }

    submit= (values) => {
        const {actions: {createUserGroup, getUserGroupList}} = this.props;
        if (values.userIds) {
            const ids = values.userIds.map(id => id.key);
            Object.assign(values, {userIds: ids});
        }
        return createUserGroup(values)
            .then(() => {
                message.success(`创建群组${values.title}成功！`);
                this.closeDialog();
                getUserGroupList({pageSize: paginationSetting.pageSize});
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || `创建群组${values.title}成功！`
                });
            });
    }

    render() {
        const {submitting, handleSubmit, visible, width, error, dispatch} = this.props;
        const resetPersonValue = () => resetSpecificField(dispatch, DIALOG.CREATE_USER_GROUP, 'userIds', []);
        return (
            <Modal
                visible={visible}
                width={width}
                title="新建群组"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.CREATE_USER_GROUP))} loading={submitting} type="primary">保存</Button>,
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
                            name="title"
                            component={renderTextField}
                            type="text"
                            placeholder="标题"
                            label="标题"
                            validate={required}
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="description"
                            style={{alignItems: 'flex-start'}}
                            rows="3"
                            component={renderTextField}
                            type="textarea"
                            label="描述"
                            validate={required}
                        />

                        <AutoSelectSearch
                            api="/api/users"
                            query="name"
                            mode="multiple"
                            resetSelectValue={resetPersonValue}
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="userIds"
                            placeholder="搜索人员(可添加多个)"
                            label="人员"
                            validate={required}
                            renderOptions={renderOptions('id', 'name')}
                        />
                    </div>
                </Form>
            </Modal>
        );
    }
}

UserGroupCreateDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default UserGroupCreateDialog;
