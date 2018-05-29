import axios from 'axios';
import { Axios } from 'utils';
import { push } from 'react-router-redux';
import { BASE_URL } from 'constants';
import { getPermissions } from 'components/userList';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const FIND_PWD_REQUEST = 'FIND_PWD_REQUEST';
export const SYNC_LOGOUT_REQUEST = 'SYNC_LOGOUT_REQUEST';

//async
export const login = (user) => (dispatch) => dispatch({
    type: LOGIN_REQUEST,
    payload: () => axios({
        method: 'POST',
        url: `${BASE_URL}/api/users/login`,
        // url: '/api/login/account',
        headers: { Authorization: `Basic ${user}` }
    })})
    .then(response => {
        const {data} = response?.value;
        if (!data) return Promise.reject(null);

        localStorage.setItem('token', data.token);
        return data.userInfo;
    })
    .then((userInfo) =>
    //get permission
        dispatch(getPermissions(userInfo.id))
            .then(({value}) => {
                if (!value) return Promise.reject(null);
                userInfo.permissions = value;
                localStorage.setItem('user', JSON.stringify(userInfo));
                return userInfo;
            }))
    .catch(error => Promise.reject(error?.response?.data));

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

