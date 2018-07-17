import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './trainingActionTypes';

//actions creater
export const getTrainingList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_TRAINING_LIST,
    payload: () => Axios.get('/api/trainings', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createTraining = (params) => ({
    type: TYPES.ASYNC_CREATE_TRAINING,
    payload: () => Axios.post('/api/trainings', params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const updateTraining = (userGroupId, params) => ({
    type: TYPES.ASYNC_UPDATE_TRAINING,
    payload: () => Axios.put(`/api/trainings/${userGroupId}`, params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteTraining = (trainingId) => ({
    type: TYPES.ASYNC_DELETE_TRAINING,
    payload: () => Axios.delete(`/api/trainings/${trainingId}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_TRAINING_LIST_SEARCH_PARAMS,
    payload: params
});
