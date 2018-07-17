import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './taskActionTypes';

//actions creater
export const getTasksList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_TASKS_LIST,
    payload: () => Axios.get('/api/tasks', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createTask = (params) => ({
    type: TYPES.ASYNC_CREATE_TASK,
    payload: () => Axios.post('/api/tasks', params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const updateTask = (userGroupId, params) => ({
    type: TYPES.ASYNC_UPDATE_TASK,
    payload: () => Axios.put(`/api/tasks/${userGroupId}`, params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteTask = (trainingId) => ({
    type: TYPES.ASYNC_DELETE_TASK,
    payload: () => Axios.delete(`/api/tasks/${trainingId}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});
