import { Axios, paginationSetting } from 'utils';
import * as TYPES from './settingActionTypes';

export const getList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_LIST,
    payload: () => Axios.get('/api/dictionarys', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createSecretLevel = (params) => ({
    type: TYPES.ASYNC_CREATE_SECRET_LEVEL,
    payload: () => Axios.post('/api/dictionarys', params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteType = (id, dicType) => ({
    type: TYPES.ASYNC_DELETE_TYPE,
    payload: () => Axios.delete(`/api/dictionarys/${id}`, {params: {dicType}})
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getDicTypeById = (id, dicType) => ({
    type: TYPES.ASYNC_DIC_TYPE_DETAILS,
    payload: () => Axios.get(`/api/dictionarys/${id}`, {params: {dicType}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});
