import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { Form, Field, reduxForm, submit, SubmissionError } from 'redux-form';
import { renderField } from '../../form';
import validate from './validate';
import style from './RestPwdDialog.scss';
// import { searchUserByName } from '../../userList/UserListAction';

// const asyncValidate = ({usernameForReset}, dispatch) => dispatch(searchUserByName(usernameForReset))
//     .then(response => {
//         const {value: {data}} = response;
//         if (!data.elements || !data.elements.length) {
//             throw { usernameForReset: '登录名不存在' }; //eslint-disable-line
//         }
//         return response;
//     });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

@reduxForm({
    form: 'restPwd',
    validate
    // asyncValidate,
    // asyncBlurFields: ['usernameForReset']
})
class ResetPwdDialog extends Component {
    static propTypes = {
        hideDialog: PropTypes.func,
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
        visible: PropTypes.bool,
        submitting: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    handleSubmit(values) {
        return sleep(1000).then(() => { //eslint-disable-line
            if (!['john', 'paul', 'george', 'ringo'].includes(values.usernameForReset)) {
                throw new SubmissionError({
                    usernameForReset: 'User does not exist',
                    _error: 'Login failed!'
                });
            } else if (values.email !== 'seven0_0@126.com') {
                throw new SubmissionError({
                    email: 'Wrong password',
                    _error: 'Loginsss failed!'
                });
            } else {
                this.props.hideDialog();
            }
        });
    }

    render() {
        const {submitting, handleSubmit, visible, hideDialog, width, dispatch } = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="找回密码"
                onCancel={hideDialog()}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit('restPwd'))} loading={submitting} type="primary">发送邮件</Button>,
                    <Button key="back" onClick={hideDialog()}>取消</Button>
                ]}
            >
                <Form name="resetform" onSubmit={handleSubmit(this.handleSubmit)}>
                    <div className={style.resetPwdContainer}>
                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName={style.resetPwdContainer__inputRow}
                            name="usernameForReset"
                            component={renderField}
                            type="text"
                            placeholder="请输入您的登录名"
                            label="登录名"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName={style.resetPwdContainer__inputRow}
                            name="email"
                            component={renderField}
                            type="email"
                            placeholder="请输入您的邮箱"
                            label="邮箱"
                        />
                    </div>
                </Form>
            </Modal>
        );
    }
}

export default ResetPwdDialog;
