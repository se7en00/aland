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

export const getALLAssociations = () => {
    const allPromises = [
        Axios.get('/api/departments', {params: {size: 2000}}).then(response => response.data),
        Axios.get('/api/users/userLevels').then(response => response.data),
        Axios.get('api/dictionarys/dicType/GENDER').then(response => response.data.map(item => ({code: item.code, name: item.name})))
    ];
    return {
        type: TYPES.ASYNC_LOAD_DEPARTMENTS_AND_USER_LEVELS,
        payload: Promise.all(allPromises).then(result => ({
            departments: result[0].elements.map(item => ({id: item.id, name: item.name})),
            userLevels: result[1],
            genders: result[2]
        })).catch(error => Promise.reject(error?.response?.data))
    };
};

export const getUserDetails = (userId) => ({
    type: TYPES.ASYNC_USER_DETAILS,
    payload: () => Axios.get(`/api/users/${userId}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

