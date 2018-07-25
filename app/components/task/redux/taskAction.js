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

export const loadOnlineLessons = () => ({
    type: TYPES.ASYNC_LOAD_COURSES,
    payload: () => Axios.get('/api/courses', {params: {size: 1000}})
        .then((response) => {
            const { data: { elements } } = response;
            return elements.map((item, idx) => {
                item.index = idx + 1;
                return item;
            });
        })
        .catch(error => Promise.reject(error?.response?.data))
});

export const loadOneClicks = () => ({
    type: TYPES.ASYNC_LOAD_PEDIAS,
    payload: () => Axios.get('/api/pedias', {params: {size: 1000}})
        .then((response) => {
            const { data: { elements } } = response;
            return elements.map((item, idx) => {
                item.index = idx + 1;
                return item;
            });
        })
        .catch(error => Promise.reject(error?.response?.data))
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
        })
    ];
    return {
        type: TYPES.ASYNC_TASK_ASSOCIATIONS,
        payload: Promise.all(allPromises).then(result => ({
            courseDirections: result[0],
            userGroups: result[1]
        })).catch(error => Promise.reject(error?.response?.data))
    };
};


export const getTaskDetails = (trainingId) => ({
    type: TYPES.ASYNC_LOAD_TASK_DETAILS,
    async payload() {
        const task = await Axios.get(`/api/tasks/${trainingId}`).then(response => response.data);
        const result = {taskDetails: task, isEditable: true};

        return result;
    }
});

export const resetTask = () => ({
    type: TYPES.SYNC_RESET_TASK,
    payload: null
});
