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

export const updateTask = (taskId, params) => ({
    type: TYPES.ASYNC_UPDATE_TASK,
    payload: () => Axios.put(`/api/tasks/${taskId}`, params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteTask = (trainingId) => ({
    type: TYPES.ASYNC_DELETE_TASK,
    payload: () => Axios.delete(`/api/tasks/${trainingId}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const loadDirections = () => ({
    type: TYPES.ASYNC_LOAD_DIRECTIONS,
    payload: () => Axios.get('/api/settings/courseDirections', {params: {size: 1000}})
        .then(response => response.data?.elements)
        .catch(error => Promise.reject(error?.response?.data))
});


export const loadRelatedLessons = (pageSize = 10, page) => {
    const allPromises = [
        Axios.get('/api/courses', {params: {size: pageSize, page}})
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data)),
        Axios.get('/api/pedias', {params: {size: pageSize, page}})
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data))
    ];

    return {
        type: TYPES.ASYNC_LOAD_RELATED_LESSONS,
        payload: Promise.all(allPromises).then(result => ({
            onlineLessons: result[0],
            oneClicks: result[1]
        })).catch(error => Promise.reject(error?.response?.data))
    };
};

export const searchOnlineLessons = ({pageSize = 10, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_RELATED_ONLINELESSONS,
    payload: () => Axios.get('/api/courses', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const searchOneClicks = ({pageSize = 10, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_RELATED_ONECLICK,
    payload: () => Axios.get('/api/pedias', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});


export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_SEARCH_PARAMS,
    payload: params
});

export const selectedLessons = (lessons, type) => ({
    type: TYPES.SYNC_SELECTED_LESSONS,
    payload: {[`${type}Selected`]: lessons}
});

export const saveTaskLessons = (taskId, lessons) => ({
    type: TYPES.ASYNC_SAVE_TASK_LESSONS,
    async payload() {
        try {
            const task = await Axios.get(`/api/tasks/${taskId}`).then(response => response.data);
            task.lessions = lessons;
            await Axios.put(`/api/tasks/${taskId}`, task).then(response => response.data);
            const updatedTask = await Axios.get(`/api/tasks/${taskId}`).then(response => response.data);
            return updatedTask;
        } catch (error) {
            return Promise.reject(error?.response?.data);
        }
    }
});

export const getALLAssociations = () => {
    const allPromises = [
        Axios.get('/api/settings/courseDirections', {params: {parentId: 0}})
            .then(response => {
                const {data} = response;
                const _temps = data.elements.map(item => {
                    const result = {
                        value: item.direction,
                        label: item.direction
                    };
                    if (item.subDirections) {
                        Object.assign(result, {children: item.subDirections.map(subItem => ({ value: subItem.direction, label: subItem.direction}))});
                    }
                    return result;
                });
                return _temps;
            }),
        Axios.get('/api/userGroups', {params: {size: 2000}}).then(response => {
            if (!response?.data?.elements) return [];
            return response?.data?.elements?.map(item => ({id: item.id, name: item.title}));
        }),
        Axios.get('api/dictionarys/dicType/TRAINING_TYPE')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data)),
        Axios.get('api/dictionarys/dicType/COST_TYPE')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data)),
            Axios.get('api/dictionarys/dicType/BUSINESS_UNIT')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data)),
            Axios.get('api/dictionarys/dicType/COST_CENTER')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data))
    ];
    return {
        type: TYPES.ASYNC_TASK_ASSOCIATIONS,
        payload: Promise.all(allPromises).then(result => ({
            courseDirections: result[0],
            userGroups: result[1],
            trainingTypes: result[2],
            costTypes: result[3]
        })).catch(error => Promise.reject(error?.response?.data))
    };
};


export const getTaskDetails = (taskId) => ({
    type: TYPES.ASYNC_LOAD_TASK_DETAILS,
    async payload() {
        const task = await Axios.get(`/api/tasks/${taskId}`).then(response => response.data);
        const result = {taskDetails: task, isEditable: true};
        return result;
    }
});

export const resetTask = () => ({
    type: TYPES.SYNC_RESET_TASK,
    payload: null
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
