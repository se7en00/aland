import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './newsActionType';

//actions creater
export const getNewsList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_NEWS_LIST,
    payload: () => Axios.get('/api/news', {params: {size: pageSize, ...rest}})
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


export const deleteNews = (id) => ({
    type: TYPES.ASYNC_DELETE_NEWS,
    payload: () => Axios.delete(`/api/news/${id}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_NEWS_LIST_SEARCH_PARAMS,
    payload: params
});

export const addNews = (data) => ({
    type: TYPES.ASYNC_ADD_NEWS,
    payload: () => Axios.post('/api/news', data)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getNews = (id) => ({
    type: TYPES.ASYNC_GET_NEWS,
    payload: () => Axios.get(`/api/news/${id}`)
        .then((response) => response?.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const editNews = (data, id) => ({
    type: TYPES.ASYNC_EDIT_NEWS,
    payload: () => Axios.put(`/api/news/${id}`, data)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getNewsComments = (id, {pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_GET_NEWS_COMMENTS,
    payload: () => Axios.get(`/api/news/${id}/comments`, {params: {size: pageSize, ...rest}})
        .then((response) => response?.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const toggleCommentStatus = (id, commentId, status) => ({
    type: TYPES.ASYNC_TOGGLE_COMMENT_STATUS,
    payload: () => Axios.put(`/api/news/${id}/comments/${commentId}/${status}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const toggleStatus = (id, status) => ({
    type: TYPES.ASYNC_TOGGLE_STATUS,
    payload: () => Axios.put(`/api/news/${id}/${status}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const loadUserGroups = () => ({
    type: TYPES.ASYNC_GET_USERGROUPS,
    payload: () => Axios.get('/api/userGroups', {params: {size: 2000}}).then(response => {
        if (!response?.data?.elements) return [];
        return response?.data?.elements?.map(item => ({id: item.id, name: item.title}));
    })
});
