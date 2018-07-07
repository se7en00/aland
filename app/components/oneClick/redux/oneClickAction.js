import { paginationSetting, Axios } from 'utils/index';
import * as TYPES from './oneClickActionTypes';

export const getOneClickList = (pageSize = paginationSetting.pageSize, page) => ({
    type: TYPES.LOAD_ONE_CLICK_LIST,
    payload: () => Axios.get('/api/pedias', {params: {size: pageSize, page}}).then(response => response.data)
});

export const addOneClick = (data) => ({
    type: TYPES.ADD_ONE_CLICK,
    payload: () => Axios.post('/api/pedias', data)
        .then(response => response.data)
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

export const setCurrentTags = (values) => ({
    type: TYPES.SET_CURRENT_TAGS,
    payload: values
});

export const getOneClick = (id) => ({
    type: TYPES.GET_ONE_CLICK,
    payload: () => Axios.get(`/api/pedias/${id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const editOneClick = (data, id) => ({
    type: TYPES.EDIT_ONE_CLICK,
    payload: () => Axios.put(`/api/pedias/${id}`, data)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});
