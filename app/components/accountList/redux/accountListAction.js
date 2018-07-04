import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './accountListActionType';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const searchUserByName = (userName) => ({
    type: TYPES.SEARCH_ACCOUNT,
    payload: () => sleep(2000).then(() => Axios.get('api/users', {params: {name: userName}}))//eslint-disable-line
});

//actions creater
export const getUserList = (pageSize = paginationSetting.pageSize, page) => ({
    type: TYPES.LOAD_ACCOUNT_LIST,
    payload: () => Axios.get('/api/users', {params: {size: pageSize, page}}).then(response => response.data)
});

export const createUser = (loginName, name) => ({
    type: TYPES.CREATE_ACCOUNT,
    payload: () => Axios.post('/api/users', {loginName, name})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const updateUser = (userId, loginName, name) => ({
    type: TYPES.UPDATE_ACCOUNT,
    payload: () => Axios.put(`/api/users/${userId}`, {loginName, name})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteUser = (userId) => ({
    type: TYPES.DELETE_ACCOUNT,
    payload: () => Axios.delete(`/api/users/${userId}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getPermissions = (userId) => ({
    type: TYPES.LOAD_ACCOUNT_PERMISSIONS,
    payload: () => Axios.get(`/api/users/${userId}/permissions`)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const updatePermissions = (userId, permissionsRequest) => ({
    type: TYPES.UPDATE_ACCOUNT_PERMISSIONS,
    payload: () => Axios.post(`api/users/${userId}/permissions`, permissionsRequest)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const resetPassword = (userId, params) => ({
    type: TYPES.RESET_ACCOUNT_PASSWORD,
    payload: () => Axios.put(`/api/users/${userId}/password`, params)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

//sync
export const syncGetAssociatedUser = (user) => ({
    type: TYPES.SYNC_EDIT_ACCOUNT,
    payload: user
});

