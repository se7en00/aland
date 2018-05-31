import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { Form, Field, reduxForm, submit, SubmissionError } from 'redux-form';
import { DIALOG } from 'constants';
import { renderField } from '../../shared/form/index';
import validate from './passwordValidate';


@connect(state => ({initialValues: state.userList?.editUser}))
@reduxForm({form: DIALOG.RESET_USER_PASSWORD, enableReinitialize: true, validate})
class ResetUserPassword extends Component {
    static dialogName = DIALOG.RESET_USER_PASSWORD;
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

    handleSubmit({oldPsd, newPsd}) {
        const { id, loginName } = this.props.initialValues;
        const { resetPassword } = this.props.actions;
        return resetPassword(id, {oldPsd, newPsd})
            .then(() => {
                message.success(`修改${loginName}的密码成功！`);
                this.props.hideDialog(DIALOG.RESET_USER_PASSWORD)();
            })
            .catch(error => {
                if (error?.errorCode === 'password_invalid') {
                    throw new SubmissionError({
                        oldPsd: error?.errorMessage
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
                title="重置密码"
                onCancel={hideDialog(DIALOG.RESET_USER_PASSWORD)}
                footer={[
                    <Button key="submit" disabled={invalid} onClick={() => dispatch(submit(DIALOG.RESET_USER_PASSWORD))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={hideDialog(DIALOG.RESET_USER_PASSWORD)}>取消</Button>
                ]}
            >
                <Form name="resetUserPWDForm" onSubmit={handleSubmit(this.handleSubmit)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="oldPsd"
                            component={renderField}
                            type="password"
                            placeholder="当前密码"
                            label="当前密码"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="newPsd"
                            component={renderField}
                            type="password"
                            placeholder="新密码"
                            label="新密码"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8 offset-md-2"
                            rowClassName="dialogContainer__inputRow"
                            name="newPsd1"
                            component={renderField}
                            type="password"
                            placeholder="重复上面的新密码"
                        />

                    </div>
                </Form>
            </Modal>
        );
    }
}

export default ResetUserPassword;
