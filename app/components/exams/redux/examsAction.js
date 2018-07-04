import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './examsActionType';

//actions creater
export const getExamsList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_EXAM_LIST,
    payload: () => Axios.get('/api/exams', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});


export const deleteExam = (id) => ({
    type: TYPES.ASYNC_DELETE_EXAM,
    payload: () => Axios.delete(`/api/exams/${id}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_EXAM_LIST_SEARCH_PARAMS,
    payload: params
});
