import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {login, findPwd} from './loginAction';
import Login from './Login';
import ResetPWD from './dialog/ResetPwdDialog';
import Dialog from '../dialog';


@connect(null, {login, push})
@Dialog(<ResetPWD findPwd={findPwd}/>)
class LoginView extends Component {
    render() {
        return (
            <Login {...this.props}/>
        );
    }
}

export default LoginView;
