import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './adminListActionType';

//actions creater
export const getAdminList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_ADMIN_LIST,
    payload: () => Axios.get('/api/users', {params: {size: pageSize, isAdmin: 1, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createUser = (loginName, name) => ({
    type: TYPES.ASYNC_CREATE_ADMIN,
    payload: () => Axios.post('/api/users', {loginName, name, isAdmin: 1})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const updateUser = (userId, loginName, name) => ({
    type: TYPES.ASYNC_UPDATE_ADMIN,
    payload: () => Axios.put(`/api/users/${userId}`, {loginName, name, isAdmin: 1})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteUser = (userId) => ({
    type: TYPES.ASYNC_DELETE_ADMIN,
    payload: () => Axios.delete(`/api/users/${userId}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getPermissions = (userId) => ({
    type: TYPES.ASYNC_LOAD_ADMIN_PERMISSIONS,
    payload: () => Axios.get(`/api/users/${userId}/permissions`)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const updatePermissions = (userId, permissionsRequest) => ({
    type: TYPES.ASYNC_UPDATE_ADMIN_PERMISSIONS,
    payload: () => Axios.post(`api/users/${userId}/permissions`, permissionsRequest)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const resetPassword = (userId) => ({
    type: TYPES.ASYNC_RESET_ADMIN_PASSWORD,
    payload: () => Axios.put(`/api/users/${userId}/resetPassword`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

//sync
export const syncGetAssociatedUser = (user) => ({
    type: TYPES.SYNC_EDIT_ADMIN,
    payload: user
});

