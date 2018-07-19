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

export const getCategories = () => ({
    type: TYPES.ASYNC_LOAD_CATEGORIES,
    payload: () => Axios.get('/api/dictionarys/dicType/CATEGORY')
        .then(response => {
            const { data = [] } = response;
            return data.map(item => ({name: item.name, code: item.code}));
        })
        .catch(error => Promise.reject(error?.response?.data))
});

export const createExam = (params) => ({
    type: TYPES.ASYNC_CREATE_EXAM,
    payload: () => Axios.post('/api/exams', params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const updateExam = (examId, params) => ({
    type: TYPES.ASYNC_UPDATE_EXAM,
    payload: () => Axios.put(`/api/exams/${examId}`, params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const editExam = (exam) => ({
    type: TYPES.ASYNC_LOAD_EDIT_EXAM,
    payload: () => Axios.get(`/api/exams/${exam.id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const resetEditExam = () => ({
    type: TYPES.SYNC_RESET_EDIT_EXAM,
    payload: null
});


export const importExams = (filePath) => ({
    type: TYPES.ASYNC_IMPORT_EXAM,
    payload: () => Axios.post('/api/exams/import', {filePath})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});
