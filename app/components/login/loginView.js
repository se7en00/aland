import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {login} from './loginAction';
import Login from './Login';

const LoginView = (props) => (
    <Login {...props}/>
);

export default connect(null, {login, push})(LoginView);
