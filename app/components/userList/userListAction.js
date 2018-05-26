import { Axios, paginationSetting } from 'utils';
import * as TYPES from './userListActionType';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const searchUserByName = (userName) => ({
    type: TYPES.SEARCH_USER,
    payload: () => sleep(2000).then(() => Axios.get('api/users', {params: {name: userName}}))//eslint-disable-line
});

//actions creater
export const getUserList = (pageSize = paginationSetting.pageSize, page) => ({
    type: TYPES.LOAD_USER_LIST,
    payload: () => Axios.get('/api/users', {params: {size: pageSize, page}}).then(response => response.data)
});

export const createUser = (loginName, name) => ({
    type: TYPES.CREATE_USER,
    payload: () => Axios.post('/api/users', {loginName, name})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const updateUser = (userId, loginName, name) => ({
    type: TYPES.UPDATE_USER,
    payload: () => Axios.put(`/api/users/${userId}`, {loginName, name})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteUser = (userId) => ({
    type: TYPES.DELETE_USER,
    payload: () => Axios.delete(`/api/users/${userId}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const resetPassword = (userId, params) => ({
    type: TYPES.RESET_USER_PASSWORD,
    payload: () => Axios.put(`/api/users/${userId}/password`, params)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

//sync
export const syncGetAssociatedUser = (user) => ({
    type: TYPES.SYNC_EDIT_USER,
    payload: user
});

