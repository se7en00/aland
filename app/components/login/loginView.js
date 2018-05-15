import React from 'react';
// import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import {login} from './loginAction';
import Login from './Login';
import validate from './validate';

const handleSubmit = (values) => {
    console.log(values);
};

const LoginView = (props) => (
    <Login {...props} onSubmit={handleSubmit}/>
);


const connectLogin = connect(null, {login, push})(LoginView);
export default reduxForm({
    form: 'login',
    validate
})(connectLogin);
