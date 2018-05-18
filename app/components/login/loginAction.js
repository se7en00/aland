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
        url: BASE_URL + URL,
        // url: '/api/login/account',
        headers: { Authorization: `Basic ${user}` },
        data: {}
    }).then(response => {
        const {data} = response;
        if (!data) {
            Promise.reject('222');
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.userInfo));
        return data.userInfo;
    })
});

//sync
export const logout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({type: LOGOUT_REQUEST});
    dispatch(push('/login'));
};

