import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './noticesActionType';

//actions creater
export const getNoticesList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_NOTICES_LIST,
    payload: () => Axios.get('/api/notices', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const loadDepartments = () => ({
    type: TYPES.ASYNC_LOAD_DEPARTMENTS,
    payload: () => Axios.get('/api/departments')
        .then(response => {
            const { data: { elements = []} } = response;
            return elements.map(item => ({name: item.name, id: item.id}));
        })
        .catch(error => Promise.reject(error?.response?.data))
});


export const deleteNotice = (id) => ({
    type: TYPES.ASYNC_DELETE_NOTICE,
    payload: () => Axios.delete(`/api/notices/${id}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_NOTICES_LIST_SEARCH_PARAMS,
    payload: params
});

export const addNotice = (data) => ({
    type: TYPES.ASYNC_ADD_NOTICE,
    payload: () => Axios.post('/api/notices', data)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getNotice = (id) => ({
    type: TYPES.ASYNC_GET_NOTICE,
    payload: () => Axios.get(`/api/notices/${id}`)
        .then((response) => response?.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const editNotice = (data, id) => ({
    type: TYPES.ASYNC_EDIT_NOTICE,
    payload: () => Axios.put(`/api/notices/${id}`, data)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getNoticeComments = (id) => ({
    type: TYPES.ASYNC_GET_NOTICE_COMMENTS,
    payload: () => Axios.get(`/api/notices/${id}/comments`)
        .then((response) => response?.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const toggleCommentStatus = (id, commentId, status) => ({
    type: TYPES.ASYNC_TOGGLE_COMMENT_STATUS,
    payload: () => Axios.put(`/api/notices/${id}/comments/${commentId}/${status}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});
