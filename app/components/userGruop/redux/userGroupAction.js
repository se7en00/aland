import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './userGroupActionType';

//actions creater
export const getUserGroupList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_USER_GROUP_LIST,
    payload: () => Axios.get('/api/userGroups', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createUserGroup = (params) => ({
    type: TYPES.ASYNC_CREATE_USER_GROUP,
    payload: () => Axios.post('/api/userGroups', params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const updateUserGroup = (userGroupId, params) => ({
    type: TYPES.ASYNC_UPDATE_USER_GROUP,
    payload: () => Axios.put(`/api/userGroups/${userGroupId}`, params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteUserGroup = (userId) => ({
    type: TYPES.ASYNC_DELETE_USER_GROUP,
    payload: () => Axios.delete(`/api/userGroups/${userId}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getUserGroupDetails = (userGroupId) => ({
    type: TYPES.ASYNC_USER_GROUP_DETAILS,
    payload: () => Axios.get(`/api/userGroups/${userGroupId}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const clearEditUserGroup = () => ({
    type: TYPES.SYNC_CLEAR_USER_GROUP_DETAILS,
    payload: null
});

