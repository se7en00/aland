import axios from 'axios';
import { Axios } from 'utils';
import { push } from 'react-router-redux';
import { BASE_URL, URL } from 'constants';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const FIND_PWD_REQUEST = 'FIND_PWD_REQUEST';
export const SYNC_LOGOUT_REQUEST = 'SYNC_LOGOUT_REQUEST';

//async
export const login = (user) => ({
    type: LOGIN_REQUEST,
    payload: () => axios({
        method: 'POST',
        url: BASE_URL + URL.LOGIN.INFO,
        // url: '/api/login/account',
        headers: { Authorization: `Basic ${user}` }
    }).then(response => {
        const {data} = response;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.userInfo));
        return data.userInfo;
    }).catch(error => Promise.reject(error?.response?.data))
});

//sync
export const logout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({type: SYNC_LOGOUT_REQUEST});
    dispatch(push('/login'));
};

export const findPwd = (userName, email) => ({
    type: FIND_PWD_REQUEST,
    payload: () => Axios.post('/api/users/findPassword/', {userName, email})
});

