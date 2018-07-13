import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './lecturersActionType';

//actions creater
export const getLecturersList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_LECTURERS_LIST,
    payload: () => Axios.get('/api/lecturers', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});


export const deleteLecturer = (id) => ({
    type: TYPES.ASYNC_DELETE_LECTURER,
    payload: () => Axios.delete(`/api/lecturers/${id}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_LECTURERS_LIST_SEARCH_PARAMS,
    payload: params
});

export const loadProvides = () => ({
    type: TYPES.ASYNC_LOAD_PROVIDES,
    payload: () => Axios.get('/api/provides', {params: {size: 1000}})
        .then((response) => {
            const { data: { elements = [] } } = response;
            return elements.map(item => ({name: item.name, id: item.id}));
        })
        .catch(error => Promise.reject(error?.response?.data))
});

export const addLecturer = (data) => ({
    type: TYPES.ASYNC_ADD_LECTURER,
    payload: () => Axios.post('/api/lecturers', data)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});
