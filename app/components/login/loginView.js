import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {login} from './loginAction';
import Login from './Login';
import ResetPWD from './dialog/ResetPwdDialog';
import Dialog from '../dialog';


@connect(null, {login, push})
@Dialog(<ResetPWD/>)
class LoginView extends Component {
    render() {
        return (
            <Login {...this.props}/>
        );
    }
}

export default LoginView;
