import { paginationSetting, Axios } from 'utils/index';
import * as TYPES from './oneClickActionTypes';

export const getOneClickList = ({pageSize = paginationSetting.pageSize, page,status,createUserName,startDate,endDate}) => ({
    type: TYPES.LOAD_ONE_CLICK_LIST,
    payload: () => Axios.get('/api/pedias', {params: {size: pageSize, page,status,createUserName,startDate,endDate}}).then(response => response.data)
});

export const getLecturers = () => ({
    type: TYPES.LOAD_ONE_CLICK_LECTURERS,
    payload: () => Axios.get('/api/lecturers').then(response => response.data)
});

export const addOneClick = (data) => ({
    type: TYPES.ADD_ONE_CLICK,
    payload: () => Axios.post('/api/pedias', data)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});
export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_USER_LIST_SEARCH_PARAMS,
    payload: params
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
