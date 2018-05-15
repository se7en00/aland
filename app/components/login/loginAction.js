import axios from 'axios';
import { push } from 'react-router-redux';
import { BASE_URL, URL } from 'constants';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

//async
export const login = (user) => ({
    type: LOGIN_REQUEST,
    payload: () => axios({
        method: 'POST',
        url: BASE_URL + URL.LOGIN.INFO,
        headers: { Authorization: `Basic ${user}` },
        data: {}
    }).then(response => {
        const {data} = response;
        localStorage.setItem('token', data.token);
        return data.userInfo;
    })
});

//sync
export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({type: LOGOUT_REQUEST});
    dispatch(push('/login'));
};

