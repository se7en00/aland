import axios from 'axios';
import { Axios } from 'utils/index';
import { push } from 'react-router-redux';
import { BASE_URL } from 'constants/index';
import { actionCreators } from 'components/accountList';
import * as TYPES from './loginActionTypes';

//async
export const login = (user) => (dispatch) => dispatch({
    type: TYPES.LOGIN_REQUEST,
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
        dispatch(actionCreators.getPermissions(userInfo.id))
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
    dispatch({type: TYPES.SYNC_LOGOUT_REQUEST});
    dispatch(push('/aland/login'));
};

export const findPwd = (userName, email) => ({
    type: TYPES.FIND_PWD_REQUEST,
    payload: () => Axios.post('/api/users/findPassword/', {userName, email})
});

