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
