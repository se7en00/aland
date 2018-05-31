import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import {login, findPwd, LoginComponent, ResetPwdDialog as ResetPWD} from 'components/login';
import Dialog from 'components/shared/dialog';

@connect(null, mapDispatchToProps)
@Dialog(<ResetPWD/>)
class LoginView extends Component {
    render() {
        return (
            <LoginComponent {...this.props}/>
        );
    }
}

//inject actions
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({login, findPwd, push}, dispatch) };
}

export default LoginView;
