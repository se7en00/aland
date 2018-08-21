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

export const editSecretLevel = (id, params) => ({
    type: TYPES.ASYNC_EDIT_SECRET_LEVEL,
    payload: () => Axios.put(`/api/dictionarys/${id}`, params)
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

export const setSliders = (images) => {
    const allPromises = images.map(image => Axios.post('/api/settings/sliders', {image})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data)));
    return {
        type: TYPES.ASYNC_CREATE_SLIDERS,
        payload: Promise.all(allPromises)
            .catch(error => Promise.reject(error?.response?.data))
    };
};

export const getSliders = () => ({
    type: TYPES.ASYNC_GET_SLIDERS,
    payload: () => Axios.get('/api/settings/sliders', {params: {page: 1, size: 4}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const resetSliders = () => ({
    type: TYPES.SYNC_RESET_SLIDERS,
    payload: null
});
