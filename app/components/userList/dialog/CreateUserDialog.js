import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Tag, message } from 'antd';
import { Form, Field, reduxForm, submit, SubmissionError } from 'redux-form';
import { DIALOG } from 'constants';
import { renderField } from '../../form';
import validate from './userValidate';
import style from './CreateAccountDialog.scss';


@reduxForm({form: DIALOG.CREATE_USER, validate})
class CreateUserDialog extends Component {
    static dialogName = DIALOG.CREATE_USER;
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
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    handleSubmit({loginName, name}) {
        return this.props.actions.createUser(loginName, name)
            .then(() => {
                message.success('创建用户成功！');
                this.props.actions.getUserList();
                this.props.hideDialog(DIALOG.CREATE_USER)();
            })
            .catch(error => {
                if (error?.errorCode === 'login_user_already_exist') {
                    throw new SubmissionError({
                        loginName: error?.errorMessage
                    });
                }

                if (error?.errorCode === 'need_login_name') {
                    throw new SubmissionError({
                        name: error?.errorMessage
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
                title="新增账户名"
                onCancel={hideDialog(DIALOG.CREATE_USER)}
                footer={[
                    <Button key="submit" disabled={invalid} onClick={() => dispatch(submit(DIALOG.CREATE_USER))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={hideDialog(DIALOG.CREATE_USER)}>取消</Button>
                ]}
            >
                <Form name="createform" onSubmit={handleSubmit(this.handleSubmit)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer u-position-relative">
                        <Tag className={style.defaultPWD_tag}>初始密码为123456</Tag>

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

export default CreateUserDialog;
