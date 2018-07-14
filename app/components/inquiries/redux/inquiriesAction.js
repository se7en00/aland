import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './inquiriesActionType';

//actions creater
export const getInquiryesList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_INQUIRIES_LIST,
    payload: () => Axios.get('/api/inquirys', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getCategories = () => ({
    type: TYPES.ASYNC_LOAD_CATEGORIES,
    payload: () => Axios.get('/api/dictionarys/dicType/CATEGORY')
        .then(response => {
            const { data = [] } = response;
            return data.map(item => ({name: item.name, code: item.code}));
        })
        .catch(error => Promise.reject(error?.response?.data))
});


export const deleteInquiry = (id) => ({
    type: TYPES.ASYNC_DELETE_INQUIRY,
    payload: () => Axios.delete(`/api/inquirys/${id}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_INQUIRIES_LIST_SEARCH_PARAMS,
    payload: params
});

export const addInquiry = (data) => ({
    type: TYPES.ASYNC_ADD_INQUIRY,
    payload: () => Axios.post('/api/inquirys', data)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getInquiry = (id) => ({
    type: TYPES.ASYNC_GET_INQUIRY,
    payload: () => Axios.get(`/api/inquirys/${id}`)
        .then((response) => response?.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const editInquiry = (data, id) => ({
    type: TYPES.ASYNC_EDIT_INQUIRY,
    payload: () => Axios.put(`/api/inquirys/${id}`, data)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});
