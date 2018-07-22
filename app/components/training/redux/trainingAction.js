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

export const publishTraining = (trainingId) => ({
    type: TYPES.ASYNC_PUBLISH_TRAINING,
    payload: () => Axios.put(`/api/trainings/${trainingId}/publish`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const closeTraining = (trainingId) => ({
    type: TYPES.ASYNC_CLOSE_TRAINING,
    payload: () => Axios.put(`/api/trainings/${trainingId}/close`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getALLAssociations = () => {
    const allPromises = [
        Axios.get('/api/settings/courseDirections', {params: {parentId: 0}})
            .then(response => {
                const {data} = response;
                const _temps = data.elements.map(item => {
                    const result = {
                        value: item.id,
                        label: item.direction
                    };
                    if (item.subDirections) {
                        Object.assign(result, {children: item.subDirections.map(subItem => ({ value: subItem.id, label: subItem.direction}))});
                    }
                    return result;
                });
                return _temps;
            }),
        Axios.get('/api/userGroups', {params: {size: 2000}}).then(response => {
            if (!response?.data?.elements) return [];
            return response?.data?.elements?.map(item => ({id: item.id, name: item.title}));
        })
    ];
    return {
        type: TYPES.ASYNC_LOAD_TRAINING_ASSOCIATIONS,
        payload: Promise.all(allPromises).then(result => ({
            courseDirections: result[0],
            userGroups: result[1]
        })).catch(error => Promise.reject(error?.response?.data))
    };
};
