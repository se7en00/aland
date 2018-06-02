import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DIALOG } from 'constants/index';
import { Button, Modal, message } from 'antd';
import { Form, Field, reduxForm, submit, SubmissionError } from 'redux-form';
import { renderTextField } from '../../shared/form/index';
import validate from './validate';
// import { searchUserByName } from '../../userList/UserListAction';

// const asyncValidate = ({usernameForReset}, dispatch) => dispatch(searchUserByName(usernameForReset))
//     .then(response => {
//         const {value: {data}} = response;
//         if (!data.elements || !data.elements.length) {
//             throw { usernameForReset: '登录名不存在' }; //eslint-disable-line
//         }
//         return response;
//     });

@reduxForm({
    form: DIALOG.FIND_PASSWORD,
    validate
    // asyncValidate,
    // asyncBlurFields: ['usernameForReset']
})
class ResetPwdDialog extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        hideDialog: PropTypes.func,
        handleSubmit: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        dispatch: PropTypes.func, //来自redux form 注入的
        findPwd: PropTypes.func,
        visible: PropTypes.bool,
        error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        invalid: PropTypes.bool,
        submitting: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    handleSubmit({usernameForReset, email}) {
        const {findPwd} = this.props.actions;
        return findPwd(usernameForReset, email)
            .then(() => {
                message.success('邮件发送成功！');
                this.props.hideDialog()();
            })
            .catch(() => {
                throw new SubmissionError({
                    _error: '邮件发送失败！'
                });
            });
    }

    render() {
        const {submitting, handleSubmit, visible, hideDialog, width, dispatch, error, invalid } = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="找回密码"
                onCancel={hideDialog()}
                footer={[
                    <Button key="submit" disabled={invalid} onClick={() => dispatch(submit(DIALOG.FIND_PASSWORD))} loading={submitting} type="primary">发送邮件</Button>,
                    <Button key="back" onClick={hideDialog()}>取消</Button>
                ]}
            >
                <Form name="resetPWDForm" onSubmit={handleSubmit(this.handleSubmit)}>

                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">
                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="usernameForReset"
                            component={renderTextField}
                            type="text"
                            placeholder="请输入您的登录名"
                            label="登录名"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="email"
                            component={renderTextField}
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
