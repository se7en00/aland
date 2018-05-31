import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Base64 } from 'js-base64';
import { Button, Icon } from 'antd';
import style from './Login.scss';
import { renderField } from '../shared/form/index';
import validate from './validate';

@reduxForm({form: 'login', validate})
class Login extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        handleSubmit: PropTypes.func,
        showDialog: PropTypes.func,
        submitting: PropTypes.bool,
        error: PropTypes.string
    };

    //login and asyncValidate
    submit = ({username, password}) => {
        const {login, push} = this.props.actions;
        return login(Base64.encode(`${username}:${password}`))
            .then(() => {push('/');})
            .catch((error) => {
                if (error?.errorCode === 'username_not_found') {
                    throw new SubmissionError({
                        username: error?.errorMessage
                    });
                } else if (error?.errorCode === 'password_incorrect') {
                    throw new SubmissionError({
                        password: error?.errorMessage
                    });
                } else {
                    throw new SubmissionError({
                        _error: error?.errorMessage || '服务器出错，请联系管理员！'
                    });
                }
            });
    }


    render() {
        const { submitting, handleSubmit, error, showDialog } = this.props;
        const cx = classNames.bind(style);
        return (
            <div className={cx('container-fluid', 'login-container')}>
                <div className={style.login}>
                    <form name="form" onSubmit={handleSubmit(this.submit)}>
                        <div className={cx('row', 'login__logo')}/>

                        {error && <div className={style['login--hasError']}><strong >{error}</strong></div>}

                        <Field
                            layout="elementOnly"
                            rowClassName={style.login__input}
                            name="username"
                            component={renderField}
                            type="text"
                            prefix={<Icon type="user"/>}
                            placeholder="登录名"
                        />

                        <Field
                            layout="elementOnly"
                            rowClassName={style.login__input}
                            name="password"
                            component={renderField}
                            type="password"
                            prefix={<Icon type="lock"/>}
                            placeholder="密码"
                        />

                        <div className={style.login__button}>
                            <Button
                                htmlType="submit"
                                loading={submitting}
                                className="u-full-width"
                                type="primary">
                                登录
                            </Button>
                        </div>

                        <div className={style.login__resetPwd}>
                            <a role="button" tabIndex="0" onClick={showDialog()}>忘记密码？</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;
