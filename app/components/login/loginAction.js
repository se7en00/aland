import axios from 'axios';
import { push } from 'react-router-redux';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

//async
export const login = (username, password) => ({
    type: LOGIN_REQUEST,
    payload: () => axios.post('/api/login/account', {username, password})
        .then(response => {
            const {data} = response;
            if (data.status !== 'ok') {
                return Promise.reject(response.statusText);
            }

            localStorage.setItem('token', data.token);
            return data.data;
        })
        .catch((error) => error)
});

//sync
export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({type: LOGOUT_REQUEST});
    dispatch(push('/login'));
};

