import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './actionTypes';

export const getOnlineLessonsList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.LOAD_ONLINE_LESSONS_LIST,
    payload: () => Axios.get('/api/courses', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const removeLesson = (lessonId) => ({
    type: TYPES.ASYNC_REMOVE_COURSE,
    payload: () => Axios.delete(`/api/courses/${lessonId}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const shelveCourse = (lessonId) => ({
    type: TYPES.ASYNC_SHELVE_COURSE,
    payload: () => Axios.put(`/api/courses/${lessonId}/issue`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const unShelveCourse = (lessonId) => ({
    type: TYPES.ASYNC_UNSHELVE_COURSE,
    payload: () => Axios.put(`/api/courses/${lessonId}/off`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_ONLINE_LESSONS_SEARCH_PARAMS,
    payload: params
});

export const getSecretLevels = () => ({
    type: TYPES.ASYNC_LOAD_ONLINE_LESSONS_SECRET_LEVELS,
    payload: () => Axios.get('/api/dictionarys/dicType/LIMIT_TYPE')
        .then(response => {
            const { data = [] } = response;
            return data.map(item => ({name: item.name, code: item.code}));
        })
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSecretLevel = (courseId, secretLevel) => ({
    type: TYPES.ASYNC_UPDATE_ONLINE_LESSONS_SECRET_LEVEL,
    payload: () => Axios.put(`/api/courses/${courseId}/secret`, {secretLevel})
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});
