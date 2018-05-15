import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Field, SubmissionError } from 'redux-form';
import { Base64 } from 'js-base64';
import { Button, Icon } from 'antd';
import style from './Login.scss';
import {renderField} from '../form';

class Login extends React.Component {
    static propTypes = {
        login: PropTypes.func,
        push: PropTypes.func,
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool,
        error: PropTypes.string
    };

    submit = ({username, password}) => this.props.login(Base64.encode(`${username}:${password}`))
        .then(() => {this.props.push('/');})
        .catch((error) => {
            const { response: { data }} = error;
            if (data.errorCode === 'username_not_found') {
                throw new SubmissionError({
                    username: data.errorMessage
                });
            } else if (data.errorCode === 'password_incorrect') {
                throw new SubmissionError({
                    password: data.errorMessage
                });
            } else {
                throw new SubmissionError({
                    _error: data.errorMessage
                });
            }
        });


    render() {
        const { submitting, handleSubmit, error } = this.props;
        const cx = classNames.bind(style);
        const loginContainerClass = cx('container-fluid', 'login-container');
        const logoClass = cx('row', 'login__logo');

        return (
            <div className={loginContainerClass}>
                <div className={style.login}>
                    <form name="form" onSubmit={handleSubmit(this.submit)}>
                        <div className={logoClass}/>
                        {error && <div className={style['login--hasError']}><strong >{error}</strong></div>}
                        <div className={style.login__input}>
                            <Field
                                name="username"
                                component={renderField}
                                type="text"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                placeholder="登录名"
                            />
                        </div>

                        <div className={style.login__input}>
                            <Field
                                name="password"
                                component={renderField}
                                type="text"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                placeholder="密码"
                            />
                        </div>

                        <div className={style.login__button}>
                            <Button
                                htmlType="submit"
                                disabled={submitting}
                                className="u-full-width"
                                type="primary">
                                登录
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;
