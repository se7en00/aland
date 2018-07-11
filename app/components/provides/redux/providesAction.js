import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './providesActionType';

//actions creater
export const getProvidesList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_PROVIDES_LIST,
    payload: () => Axios.get('/api/provides', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});


export const deleteProvide = (id) => ({
    type: TYPES.ASYNC_DELETE_PROVIDE,
    payload: () => Axios.delete(`/api/provides/${id}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_PROVIDES_LIST_SEARCH_PARAMS,
    payload: params
});

export const getProvide = (id) => ({
    type: TYPES.ASYNC_GET_PROVIDE,
    payload: () => Axios.get(`/api/provides/${id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const addProvide = (data) => ({
    type: TYPES.ASYNC_ADD_PROVIDE,
    payload: () => Axios.post('/api/provides', data)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const editProvide = (data, id) => ({
    type: TYPES.ASYNC_EDIT_PROVIDE,
    payload: () => Axios.put(`/api/provides/${id}`, data)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});


export const getCategories = () => ({
    type: TYPES.LOAD_CATEGORIES,
    payload: () => Axios.get('/api/dictionarys/dicType/CATEGORY')
        .then(response => {
            const { data = [] } = response;
            return data.map(item => ({name: item.name, code: item.code}));
        })
        .catch(error => Promise.reject(error?.response?.data))
});

export const setCurrentProvide = (provide) => ({
    type: TYPES.SET_CURRENT_PROVIDE,
    payload: provide
});
