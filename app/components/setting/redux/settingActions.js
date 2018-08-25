import { Axios, paginationSetting } from 'utils';
import * as TYPES from './settingActionTypes';

export const getList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_LIST,
    payload: () => Axios.get('/api/dictionarys', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createSecretLevel = (params) => ({
    type: TYPES.ASYNC_CREATE_SECRET_LEVEL,
    payload: () => Axios.post('/api/dictionarys', params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const editSecretLevel = (id, params) => ({
    type: TYPES.ASYNC_EDIT_SECRET_LEVEL,
    payload: () => Axios.put(`/api/dictionarys/${id}`, params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteType = (id, dicType) => ({
    type: TYPES.ASYNC_DELETE_TYPE,
    payload: () => Axios.delete(`/api/dictionarys/${id}`, {params: {dicType}})
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getDicTypeById = (id, dicType) => ({
    type: TYPES.ASYNC_DIC_TYPE_DETAILS,
    payload: () => Axios.get(`/api/dictionarys/${id}`, {params: {dicType}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSliders = (images) => {
    const allPromises = images.map(image => Axios.post('/api/settings/sliders', {image})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data)));
    return {
        type: TYPES.ASYNC_CREATE_SLIDERS,
        payload: Promise.all(allPromises)
            .catch(error => Promise.reject(error?.response?.data))
    };
};

export const getSliders = () => ({
    type: TYPES.ASYNC_GET_SLIDERS,
    payload: () => Axios.get('/api/settings/sliders', {params: {page: 1, size: 4}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const resetSliders = () => ({
    type: TYPES.SYNC_RESET_SLIDERS,
    payload: null
});

//lecture
export const getLecturesLevels = () => ({
    type: TYPES.ASYNC_GET_LECTURES,
    payload: () => Axios.get('api/dictionarys/dicType/TEACHER_LEVEL')
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const saveLecturesLevels = (newName, code) => ({
    type: TYPES.ASYNC_SAVE_LECTURES,
    async payload() {
        const params = {
            dicType: 'TEACHER_LEVEL',
            dictionaryCreates: [{
                name: newName,
                code
            }]
        };
        await Axios.post('/api/dictionarys', params)
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        const list = await Axios.get('api/dictionarys/dicType/TEACHER_LEVEL')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        return list;
    }
});

export const deleteLctureLevels = (id) => ({
    type: TYPES.ASYNC_SAVE_LECTURES,
    async payload() {
        await Axios.delete(`/api/dictionarys/${id}`)
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        const list = await Axios.get('api/dictionarys/dicType/TEACHER_LEVEL')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        return list;
    }
});

export const getTrainings = () => ({
    type: TYPES.ASYNC_GET_TRAINING_TYPE,
    payload: () => Axios.get('api/dictionarys/dicType/TRAINING_TYPE')
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getCosts = () => ({
    type: TYPES.ASYNC_GET_COST_TYPE,
    payload: () => Axios.get('api/dictionarys/dicType/COST_TYPE')
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const saveTrainingType = (newName, code) => ({
    type: TYPES.ASYNC_SAVE_TRAINING,
    async payload() {
        const params = {
            dicType: 'TRAINING_TYPE',
            dictionaryCreates: [{
                name: newName,
                code
            }]
        };
        await Axios.post('/api/dictionarys', params)
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        const list = await Axios.get('api/dictionarys/dicType/TRAINING_TYPE')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        return list;
    }
});

export const saveCostTypes = (newName, code) => ({
    type: TYPES.ASYNC_SAVE_COST,
    async payload() {
        const params = {
            dicType: 'COST_TYPE',
            dictionaryCreates: [{
                name: newName,
                code
            }]
        };
        await Axios.post('/api/dictionarys', params)
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        const list = await Axios.get('api/dictionarys/dicType/COST_TYPE')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        return list;
    }
});

export const deleteTraining = (id) => ({
    type: TYPES.ASYNC_REMOVE_TRAINING,
    async payload() {
        await Axios.delete(`/api/dictionarys/${id}`)
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        const list = await Axios.get('api/dictionarys/dicType/TRAINING_TYPE')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        return list;
    }
});

export const deleteCost = (id) => ({
    type: TYPES.ASYNC_REMOVE_COST,
    async payload() {
        await Axios.delete(`/api/dictionarys/${id}`)
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        const list = await Axios.get('api/dictionarys/dicType/COST_TYPE')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        return list;
    }
});

export const setActivePanel = (keys) => ({
    type: TYPES.SYNC_ACTIVE_PANEL,
    payload: keys
});
