import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Input, Button } from 'antd';
import style from './Login.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        login: PropTypes.func,
        push: PropTypes.func
    };

    state = {
        username: '',
        password: '',
        submitted: false
    };

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password)
                .then(() => {this.props.push('/');});
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        const cx = classNames.bind(style);
        const loginContainerClass = cx('container-fluid', 'login-container');
        const logoClass = cx('row', 'login__logo');
        return (
            <div className={loginContainerClass}>
                <div className={style.login}>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={logoClass}/>
                        <div className={style.login__input}>
                            <Input size="large" placeholder="登录名" name="username" value={username} onChange={this.handleChange}/>
                            {submitted && !username &&
                            <div className={style['login--hasError']}>登录名不能为空</div>
                            }
                        </div>

                        <div className={style.login__input}>
                            <Input size="large" placeholder="密码" name="password" value={password} onChange={this.handleChange}/>
                            {submitted && !password &&
                            <div className="help-block">密码不能为空</div>
                            }
                        </div>

                        <div className={style.login__button}>
                            <Button htmlType="submit" className="u-full-width" type="primary">登录</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;
