import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { Form, Field, reduxForm, submit, SubmissionError } from 'redux-form';
import { DIALOG } from 'constants';
import { renderField } from '../../form';
import validate from './userValidate';


@connect(state => ({initialValues: state.userList?.editUser}))
@reduxForm({form: DIALOG.EDIT_USER, enableReinitialize: true, validate})
class EditUserDialog extends Component {
    static dialogName = DIALOG.EDIT_USER;
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        //隐藏弹出框
        hideDialog: PropTypes.func,
        //提交表单，由redux-form传入
        handleSubmit: PropTypes.func,
        //异步方法，在父层注入dialog时，由Dialog高阶组件取的，并传入每个dialog
        actions: PropTypes.objectOf(PropTypes.func),
        //由于button不在form表单中， 我们采用redux-frorm的remote button，通过redux dispatch方法来来提交表单
        dispatch: PropTypes.func,
        //弹出框显示 ，隐藏flag
        visible: PropTypes.bool,
        //错误信息，可以是同步和异步验证的错误信息，也是submit返回的错误信息
        error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        //redux-form 表单有验证错误为true, 相反为false
        invalid: PropTypes.bool,
        //表单是否提交
        submitting: PropTypes.bool,
        //弹出框的宽度
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        //redux-form 初始表单值
        initialValues: PropTypes.object
    };

    handleSubmit({loginName, name}) {
        const {id} = this.props.initialValues;
        const {updateUser} = this.props.actions;
        return updateUser(id, loginName, name)
            .then(() => {
                message.success('修改用户成功！');
                this.props.actions.getUserList();
                this.props.hideDialog(DIALOG.EDIT_USER)();
            })
            .catch(error => {
                if (error?.errorCode === 'login_user_already_exist') {
                    throw new SubmissionError({
                        loginName: error?.errorMessage
                    });
                } else if (error?.errorCode === 'need_login_name') {
                    throw new SubmissionError({
                        name: error?.errorMessage
                    });
                } else {
                    throw new SubmissionError({
                        _error: error?.errorMessage
                    });
                }
            });
    }

    render() {
        const {submitting, handleSubmit, visible, hideDialog, width, dispatch, error, invalid } = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                className="test"
                title="编辑账户名"
                onCancel={hideDialog(DIALOG.EDIT_USER)}
                footer={[
                    <Button key="submit" disabled={invalid} onClick={() => dispatch(submit(DIALOG.EDIT_USER))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={hideDialog(DIALOG.EDIT_USER)}>取消</Button>
                ]}
            >
                <Form name="resetform" onSubmit={handleSubmit(this.handleSubmit)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="loginName"
                            component={renderField}
                            type="text"
                            placeholder="登录名"
                            label="登录名"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="name"
                            component={renderField}
                            type="text"
                            placeholder="请填写真实姓名"
                            label="账户名"
                        />

                    </div>
                </Form>
            </Modal>
        );
    }
}

export default EditUserDialog;
