import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './userListActionType';

//actions creater
export const getUserList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_USER_LIST,
    payload: () => Axios.get('/api/users', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createUser = (params) => ({
    type: TYPES.ASYNC_CREATE_USER,
    payload: () => Axios.post('/api/users', params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteUser = (userId) => ({
    type: TYPES.ASYNC_DELETE_USER,
    payload: () => Axios.delete(`/api/users/${userId}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_USER_LIST_SEARCH_PARAMS,
    payload: params
});

