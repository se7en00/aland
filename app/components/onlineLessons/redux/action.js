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

export const setLessonPassed = (lessonId) => ({
    type: TYPES.ASYNC_SET_COURSE_PASSED,
    payload: () => Axios.put(`/api/courses/${lessonId}/passed`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_ONLINE_LESSONS_SEARCH_PARAMS,
    payload: params
});
