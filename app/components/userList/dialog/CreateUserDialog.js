import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Tag, message } from 'antd';
import { Form, Field, reduxForm, submit, SubmissionError } from 'redux-form';
import { DIALOG } from 'constants';
import { renderField } from '../../form';
import validate from './createUserValidate';
import style from './CreateAccountDialog.scss';


@reduxForm({form: DIALOG.CREATE_USER, validate})
class CreateUserDialog extends Component {
    static dialogName = DIALOG.CREATE_USER;
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        hideDialog: PropTypes.func,
        handleSubmit: PropTypes.func,
        createUser: PropTypes.func,
        dispatch: PropTypes.func,
        visible: PropTypes.bool,
        error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        invalid: PropTypes.bool,
        submitting: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    handleSubmit({loginName, name}) {
        return this.props.createUser(loginName, name)
            .then(() => {
                message.success('创建用户成功！');
                this.props.hideDialog(DIALOG.CREATE_USER)();
            })
            .catch(error => {
                if (error?.errorCode === 'login_user_already_exist') {
                    throw new SubmissionError({
                        name: error?.errorMessage
                    });
                }

                if (error?.errorCode === 'need_login_name') {
                    throw new SubmissionError({
                        loginName: error?.errorMessage
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
                <Form name="resetform" onSubmit={handleSubmit(this.handleSubmit)}>
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
                            placeholder="请填写真实姓名"
                            label="账户名"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="name"
                            component={renderField}
                            type="text"
                            placeholder="登录名"
                            label="登录名"
                        />

                    </div>
                </Form>
            </Modal>
        );
    }
}

export default CreateUserDialog;
