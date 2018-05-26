import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import {login, findPwd} from './loginAction';
import Login from './Login';
import ResetPWD from './dialog/ResetPwdDialog';
import Dialog from '../dialog';

@connect(null, mapDispatchToProps)
@Dialog(<ResetPWD/>)
class LoginView extends Component {
    render() {
        return (
            <Login {...this.props}/>
        );
    }
}

//inject actions
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({login, findPwd, push}, dispatch) };
}

export default LoginView;
