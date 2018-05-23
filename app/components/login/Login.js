import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Base64 } from 'js-base64';
import { Button, Icon } from 'antd';
import style from './Login.scss';
import { renderField } from '../form';
import validate from './validate';

const cx = classNames.bind(style);

@reduxForm({form: 'login', validate})
class Login extends Component {
    static propTypes = {
        login: PropTypes.func,
        push: PropTypes.func,
        handleSubmit: PropTypes.func,
        showDialog: PropTypes.func,
        submitting: PropTypes.bool,
        error: PropTypes.string
    };

    //login and asyncValidate
    submit = ({username, password}) => this.props.login(Base64.encode(`${username}:${password}`))
        .then(() => {this.props.push('/');})
        .catch((error) => {
            const data = error?.response?.data;
            if (data?.errorCode === 'username_not_found') {
                throw new SubmissionError({
                    username: data?.errorMessage
                });
            } else if (data?.errorCode === 'password_incorrect') {
                throw new SubmissionError({
                    password: data?.errorMessage
                });
            } else {
                throw new SubmissionError({
                    _error: data?.errorMessage || '服务器错误，请联系管理员！'
                });
            }
        });


    render() {
        const { submitting, handleSubmit, error, showDialog } = this.props;
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
                            type="text"
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
                            <a role="button" tabIndex="0" onClick={showDialog}>忘记密码？</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;
