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

export const updateTraining = (trainingId, params) => ({
    type: TYPES.ASYNC_UPDATE_TRAINING,
    payload: () => Axios.put(`/api/trainings/${trainingId}`, params)
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
            Axios.get('api/dictionarys/dicType/BUSINESS_UNIT')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data)),
            Axios.get('api/dictionarys/dicType/COST_CENTER')
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data))
    ];
    return {
        type: TYPES.ASYNC_LOAD_TRAINING_ASSOCIATIONS,
        payload: Promise.all(allPromises).then(result => ({
            courseDirections: result[0],
            userGroups: result[1],
            trainingTypes: result[2],
            businessUnit:result[3],
            costCenter:result[4]
        })).catch(error => Promise.reject(error?.response?.data))
    };
};

export const resetTrainings = () => ({
    type: TYPES.SYNC_RESET_TRAININGS,
    payload: null
});

export const getTrainingDetails = (trainingId) => ({
    type: TYPES.ASYNC_LOAD_TRAINING_DETAILS,
    async payload() {
        const training = await Axios.get(`/api/trainings/${trainingId}`).then(response => response.data);
        const result = {trainingDetails: training, isEditable: true, lessons: {}};

        const lessons = await Axios.get(`/api/trainings/${trainingId}/lessions`)
            .then(response => response?.data);
        if (lessons && lessons.elements.length > 0) {
            result.lessons = lessons;
        }

        const users = await Axios.get(`/api/trainings/${trainingId}/users`).then(response => response?.data);
        if (users && users.elements.length > 0) {
            result.users = users;
          
        }

        const tusers = await Axios.get(`/api/tasks/${trainingId}/users`).then(response => response?.data);
        if (users && users.elements.length > 0) {
            result.tusers = tusers;
        }
        const exams = await Axios.get(`/api/trainings/${trainingId}/exams`, {params: {size: 2000}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        if (exams) {
            result.exams = exams;
        }
        return result;
    }
});

export const saveTrainingsExamConfig = (trainingId, examParams) => ({
    type: TYPES.ASYNC_UPDATE_TRAINING_EXAMS,
    async payload() {
        const training = await Axios.get(`/api/trainings/${trainingId}`).then(response => response.data);
        Object.assign(training, examParams);
        const trainingDetails = await Axios.put(`/api/trainings/${trainingId}`, training).then(response => response.data);
        return trainingDetails;
    }
});

export const getUsers = ({trainingId, pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_TRAINING_USER_LIST,
    payload: () => Axios.get(`/api/trainings/${trainingId}/users`, {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const saveTrainingLesson = (trainingId, params) => ({
    type: TYPES.ASYNC_SAVE_TRAINING_LESSON,
    async payload() {
        try {
            await Axios.post(`/api/trainings/${trainingId}/lessions`, params).then(response => response.data);
            const allLessons = await Axios.get(`/api/trainings/${trainingId}/lessions`).then(response => response?.data);
            return allLessons;
        } catch (error) {
            return Promise.reject(error?.response?.data);
        }
    }
});

export const deleteTrainingLesson = (trainingId, lessonId) => ({
    type: TYPES.ASYNC_DELETE_TRAINING_LESSON,
    async payload() {
        try {
            await Axios.delete(`api/trainings/${trainingId}/lessions/${lessonId}`).then(response => response?.data);
            const allLessons = await Axios.get(`/api/trainings/${trainingId}/lessions`).then(response => response?.data);
            return allLessons;
        } catch (error) {
            return Promise.reject(error?.response?.data);
        }
    }
});

export const getTrainingLessonDetails = (trainingId, lessonId) => ({
    type: TYPES.ASYNC_LOAD_TRAINING_LESSON_DETAILS,
    payload: () => Axios.get(`/api/trainings/${trainingId}/lessions/${lessonId}`)
        .then(response => response?.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const updateTrainingLesson = (trainingId, lessonId, params) => ({
    type: TYPES.ASYNC_UPDATE_TRAINING_LESSON,
    async payload() {
        try {
            await Axios.post(`api/trainings/${trainingId}/lessions/${lessonId}`, params).then(response => response?.data);
            const allLessons = await Axios.get(`/api/trainings/${trainingId}/lessions`).then(response => response?.data);
            return allLessons;
        } catch (error) {
            return Promise.reject(error?.response?.data);
        }
    }
});

export const checkIn = ({userId, trainingId, ...rest}) => ({
    type: TYPES.ASYNC_CHECK_IN_TRAINING_USER,
    async payload() {
        try {
            await Axios.put(`/api/users/${userId}/trainings/${trainingId}/checkin`).then(() => true);
            const users = await Axios.get(`/api/trainings/${trainingId}/users`, {params: {...rest}})
                .then(response => response?.data);
            return users;
        } catch (error) {
            return Promise.reject(error?.response?.data);
        }
    }
});

export const uploadFileTrue = ({userId,trainingId,contractUrl,...rest}) =>({
    type: TYPES.ASYNC_UPLOADFILETRUE,
    async payload() {
        try{
            console.log(contractUrl)
            let result ={}
            await Axios.put(`/api/users/${userId}/trainings/${trainingId}/contract`,{contractUrl}).then(response => response?.data);
           console.log(contractUrl)
            const users = await Axios.get(`/api/trainings/${trainingId}/users`, {params: {...rest}})
            .then(response => response?.data);
            result.users =users;
        return result;
        }
        catch (error) {
            return Promise.reject(error?.response?.data);
        }
    }
});
export const getLibExams = (...params) => ({
    type: TYPES.ASYNC_LOAD_LIB_EXAMS,
    payload: () => Axios.get('/api/exams', {params: Object.assign({size: paginationSetting.pageSize}, ...params)})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getSelectedLibExam = (exams) => ({
    type: TYPES.SYNC_GET_SELECTED_LIB_EXAMS,
    payload: exams
});

export const saveSelectedLibExams = (trainingId, selectedLibExams) => dispatch => {
    const allPromis = selectedLibExams.map(libExam =>
        Axios.post(`/api/trainings/${trainingId}/exams`, {examId: libExam.id})
            .then(response => response.data)
            .catch(error => error?.response?.data));
    return dispatch({
        type: TYPES.ASYNC_SAVE_SELECTED_LIB_EXAMS,
        async payload() {
            await Promise.all(allPromis);
            const exams = await Axios.get(`/api/trainings/${trainingId}/exams`, {params: {size: 2000}})
                .then(response => response.data);
            return exams;
        }
    });
};

export const getCategories = () => ({
    type: TYPES.ASYNC_LOAD_CATEGORIES,
    payload: () => Axios.get('/api/dictionarys/dicType/CATEGORY')
        .then(response => {
            const { data = [] } = response;
            return data.map(item => ({name: item.name, code: item.code}));
        })
        .catch(error => Promise.reject(error?.response?.data))
});

export const createCustomizeExam = (trainingId, params) => ({
    type: TYPES.ASYNC_CREATE_CUSTOMIZE_EXAM,
    async payload() {
        const newExam = await Axios.post('/api/exams', params)
            .then(response => response.data);
        await Axios.post(`/api/trainings/${trainingId}/exams`, {examId: newExam.id})
            .then(response => response.data);
        const exams = await Axios.get(`/api/trainings/${trainingId}/exams`, {params: {size: 2000}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        return exams;
    }
});


export const startExam = (trainingId, examId) => ({
    type: TYPES.ASYNC_START_EXAM,
    async payload() {
        await Axios.put(`/api/trainings/${trainingId}/exams/${examId}/start`);
        const exams = await Axios.get(`/api/trainings/${trainingId}/exams`, {params: {size: 2000}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        return exams;
    }
});

export const pauseExam = (trainingId, examId) => ({
    type: TYPES.ASYNC_PAUSE_EXAM,
    async payload() {
        await Axios.put(`/api/trainings/${trainingId}/exams/${examId}/pause`);
        const exams = await Axios.get(`/api/trainings/${trainingId}/exams`, {params: {size: 2000}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        return exams;
    }
});

export const deleteExam = (trainingId, examId) => ({
    type: TYPES.ASYNC_DELETE_EXAM,
    async payload() {
        await Axios.delete(`/api/trainings/${trainingId}/exams/${examId}`);
        const exams = await Axios.get(`/api/trainings/${trainingId}/exams`, {params: {size: 2000}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        return exams;
    }
});

export const getExamDetails = (examId) => ({
    type: TYPES.ASYNC_LOAD_EXAM_DETAILS,
    payload: () => Axios.get(`/api/exams/${examId}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getExamUserList = (trainingId, examId) => ({
    type: TYPES.ASYNC_LOAD_EXAM_USER_LIST,
    payload: () => Axios.get('/api/users/ALL/exams', {params: {relativeId: trainingId, examId}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

