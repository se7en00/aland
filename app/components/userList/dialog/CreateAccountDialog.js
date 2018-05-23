import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../form';
import style from '../../login/dialog/RestPwdDialog.scss';

@reduxForm({form: 'restPwd'})
class CreateAccountDialog extends PureComponent {
    static dialogName = 'createAccount';
    static propTypes = {
        hideDialog: PropTypes.func,
        handleSubmit: PropTypes.func,
        visible: PropTypes.bool,
        submitting: PropTypes.bool,
        pristine: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        // error: PropTypes.string
    };

    submit = () => {
        console.log('2222');
        this.props.hideDialog();
    }

    render() {
        const {submitting, handleSubmit, visible, hideDialog, pristine, width} = this.props;
        return (
            <form name="form" onSubmit={handleSubmit(this.submit)}>
                <Modal
                    visible={visible}
                    width={width}
                    title="找回密码"
                    onCancel={hideDialog('createAccount')}
                    footer={[
                        <Button key="submit" disabled={pristine} loading={submitting} type="primary">发送邮件</Button>,
                        <Button key="back" onClick={hideDialog('createAccount')}>取消</Button>
                    ]}
                >
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
                </Modal>
            </form>
        );
    }
}

export default CreateAccountDialog;
