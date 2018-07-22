import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './courseDirectionActionTypes';

//actions creater
export const getCourseDirectionList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_COURSE_DIRECTION_LIST,
    payload: () => Axios.get('/api/settings/courseDirections', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createCourseDirection = (params) => ({
    type: TYPES.ASYNC_CREATE_COURSE_DIRECTION,
    payload: () => Axios.post('/api/userGroups', params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const updateCourseDirection = (userGroupId, params) => ({
    type: TYPES.ASYNC_UPDATE_COURSE_DIRECTION,
    payload: () => Axios.put(`/api/userGroups/${userGroupId}`, params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteCourseDirection = (userId) => ({
    type: TYPES.ASYNC_DELETE_COURSE_DIRECTION,
    payload: () => Axios.delete(`/api/userGroups/${userId}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getCourseDirectionDetails = (userGroupId) => ({
    type: TYPES.ASYNC_COURSE_DIRECTION_DETAILS,
    payload: () => Axios.get(`/api/userGroups/${userGroupId}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const clearEditCourseDirection = () => ({
    type: TYPES.SYNC_CLEAR_COURSE_DIRECTION_DETAILS,
    payload: null
});

