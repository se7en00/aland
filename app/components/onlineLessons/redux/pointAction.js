import { Axios, paginationSetting } from 'utils';
import * as TYPES from './actionTypes';

export const getPointContent = (courseId, pointId) => ({
    type: TYPES.ASYNC_LOAD_POINT_CONTENT,
    async payload() {
        if (!courseId || !pointId) return null;
        let result;
        //load study info
        const pointContent = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents`)
            .then(response => Object.assign({courseId, pointId}, response.data))
            .catch(error => {
                //如果没有创建点内容， 自动创建点内容
                const {errorCode} = error?.response.data;
                if (error?.response?.status === 404 && errorCode === 'errors.com.conedot.aland.training.courseContent_not_found') {
                    return Axios.post(`/api/courses/${courseId}/nodes/${pointId}/contents`)
                        .then(response => Object.assign({courseId, pointId}, response.data));
                }
                return Promise.reject(error);
            });
        //build
        result = {pointContent, videoType: /^\/upload/.test(pointContent.link) ? '2' : '1'};

        //load homework
        const homeWorks = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/works`, {params: {size: 1000}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        if (homeWorks) {
            result = Object.assign(result, {homeWorks});
        }

        const exams = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/exams`, {params: {size: 2000}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        if (exams) {
            result = Object.assign(result, {exams});
        }

        const olMaterials = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/multimedias`, {params: {size: 2000, type: 'OL'}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        if (olMaterials) {
            result = Object.assign(result, {olMaterials});
        }

        const dlMaterials = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/multimedias`, {params: {size: 2000, type: 'DL'}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        if (dlMaterials) {
            result = Object.assign(result, {dlMaterials});
        }

        return result;
    }
});

export const switchStudyContentType = (videoType) => ({
    type: TYPES.SYNC_CHANGE_STUDY_CONTENTS_TYPE,
    payload: videoType
});

export const getSelectedMaterial = (material) => ({
    type: TYPES.SYNC_GET_SELECTED_MATERIAL,
    payload: material
});

export const getSelectedMultiMaterials = (materials, type) => ({
    type: TYPES.SYNC_GET_SELECTED_MULTIPLE_MATERIAL,
    payload: {[type]: materials}
});

export const setMaterialsType = (type) => ({
    type: TYPES.SYNC_SET_MULTIPLE_MATERIAL_TYPE,
    payload: type
});

export const saveSelectedMultiMaterials = (courseId, pointId, ids, type) => dispatch => {
    const allPromises = ids.map(id => {
        const params = {
            type,
            multimediaId: id
        };
        return Axios.put(`/api/courses/${courseId}/nodes/${pointId}/contents/multimedias`, params)
            .then(response => response.data)
            .catch(error => error?.response?.data);
    });
    return dispatch({
        type: TYPES.ASYNC_SAVE_SELECTED_MATEROALS,
        async payload() {
            await Promise.all(allPromises);
            const materials = await Axios.get(`api/courses/${courseId}/nodes/${pointId}/contents/multimedias`, {params: {size: 2000, type}})
                .then(response => response.data);
            if (type === 'OL') {
                return {olMaterials: materials};
            }
            return {dlMaterials: materials};
        }
    });
};

export const deleteMultiMaterials = (courseId, pointId, id, type) => ({
    type: TYPES.ASYNC_DELETE_MATEROAL,
    async payload() {
        try {
            await Axios.delete(`/api/courses/${courseId}/nodes/${pointId}/contents/multimedias/${id}`).then(() => true);
            const materials = await Axios.get(`api/courses/${courseId}/nodes/${pointId}/contents/multimedias`, {params: {size: 2000, type}}).then(response => response.data);
            if (type === 'OL') {
                return {olMaterials: materials};
            }
            return {dlMaterials: materials};
        } catch (error) {
            return Promise.reject(error?.response?.data);
        }
    }
});

export const removeSelectedMaterial = () => ({
    type: TYPES.SYNC_REMOVE_SELECTED_MATERIAL,
    payload: null
});

export const saveStudyContent = (courseId, pointId, StudyUpdate) => ({
    type: TYPES.ASYNC_SAVE_POINT_STUDY_CONTENT,
    payload: () => Axios.put(`/api/courses/${courseId}/nodes/${pointId}/contents/studyContents`, StudyUpdate)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getMaterials = (...params) => ({
    type: TYPES.ASYNC_LOAD_MATERIALS,
    payload: () => Axios.get('/api/multimedias', {params: Object.assign({size: paginationSetting.pageSize}, ...params)})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const deleteHomeWork = (courseId, pointId, homeWorkId) => ({
    type: TYPES.ASYNC_DELETE_HOME_WORK,
    payload: () => Axios.delete(`/api/courses/${courseId}/nodes/${pointId}/contents/works/${homeWorkId}`)
        .then(() => homeWorkId)
        .catch(error => Promise.reject(error?.response?.data))
});

export const editHomeWork = (type, params) => ({
    type: TYPES.SYNC_EDIT_HOME_WORK,
    meta: {omitLoading: type !== 'INTERACTION'},
    payload: () => {
        if (type === 'INTERACTION') {
            if (!params) return {type};
            const {courseId, pointId, homeWorkId} = params;
            return Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/works/${homeWorkId}`)
                .then(response => {
                    const {data} = response;
                    return {
                        type: data.type,
                        content1: data.content1,
                        content2: data.content2,
                        term: data.term,
                        users: data.targetUsers.map(user => ({key: user.id, label: user.name})),
                        workId: data.id
                    };
                })
                .catch(error => Promise.reject(error?.response?.data));
        }
        return Promise.resolve({
            type,
            content1: params?.content1,
            content2: params?.content2,
            term: params?.term,
            users: params?.users,
            workId: params?.id
        });
    }
});

export const saveHomeWork = (courseId, pointId, homeWorkId, type, content) => ({
    type: TYPES.ASYNC_SAVE_HOME_WORK,
    async payload() {
        if (!courseId || !pointId) return null;
        const body = {
            courseContentId: pointId,
            type,
            content1: content
        };
        try {
            if (!homeWorkId) {
                await Axios.post(`/api/courses/${courseId}/nodes/${pointId}/contents/works`, body)
                    .then(response => response.data);
            } else {
                await Axios.put(`/api/courses/${courseId}/nodes/${pointId}/contents/works/${homeWorkId}`, body)
                    .then(response => response.data);
            }
            //load homework
            const homeWorks = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/works`, {params: {size: 1000}})
                .then(response => response.data);
            return homeWorks;
        } catch (error) {
            return Promise.reject(error?.response?.data);
        }
    }
});

export const saveInteractionHomeWork = (courseId, pointId, homeWorkId, params) => ({
    type: TYPES.ASYNC_SAVE_INTERACTION_HOME_WORK,
    async payload() {
        if (!courseId || !pointId) return null;
        try {
            if (!homeWorkId) {
                await Axios.post(`/api/courses/${courseId}/nodes/${pointId}/contents/works`, params)
                    .then(response => response.data);
            } else {
                await Axios.put(`/api/courses/${courseId}/nodes/${pointId}/contents/works/${homeWorkId}`, params)
                    .then(response => response.data);
            }
            //load homework
            const homeWorks = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/works`, {params: {size: 1000}})
                .then(response => response.data);
            return homeWorks;
        } catch (error) {
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

export const deleteExam = (courseId, pointId, examId) => ({
    type: TYPES.ASYNC_DELETE_EXAM,
    payload: () => Axios.delete(`/api/courses/${courseId}/nodes/${pointId}/contents/exams/${examId}`)
        .then(() => examId)
        .catch(error => Promise.reject(error?.response?.data))
});

export const saveSelectedLibExams = (courseId, pointId, selectedLibExams) => dispatch => {
    const allPromis = selectedLibExams.map(libExam =>
        Axios.put(`/api/courses/${courseId}/nodes/${pointId}/contents/exams/${libExam.id}`)
            .then(response => response.data)
            .catch(error => error?.response?.data));
    return dispatch({
        type: TYPES.ASYNC_SAVE_SELECTED_LIB_EXAMS,
        async payload() {
            await Promise.all(allPromis);
            const exams = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/exams`, {params: {size: 2000}})
                .then(response => response.data);
            return exams.courseExamInfos;
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

export const updateExams = (courseId, pointId, params) => ({
    type: TYPES.ASYNC_UPDATE_EXAM,
    payload: () => Axios.put(`/api/courses/${courseId}/nodes/${pointId}/contents/exams`, params)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createCustomizeExam = (courseId, pointId, params) => ({
    type: TYPES.ASYNC_CREATE_CUSTOMIZE_EXAM,
    async payload() {
        const newExam = await Axios.post('/api/exams', params)
            .then(response => response.data);
        await Axios.put(`/api/courses/${courseId}/nodes/${pointId}/contents/exams/${newExam.id}`)
            .then(response => response.data);
        const exams = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/exams`, {params: {size: 2000}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        return exams.courseExamInfos;
    }
});

export const startExam = (courseId, pointId, examId) => ({
    type: TYPES.ASYNC_START_EXAM,
    async payload() {
        await Axios.put(`/api/courses/${courseId}/nodes/${pointId}/contents/exams/${examId}/start`);
        const exams = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/exams`, {params: {size: 2000}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        return exams.courseExamInfos;
    }
});

export const pauseExam = (courseId, pointId, examId) => ({
    type: TYPES.ASYNC_PAUSE_EXAM,
    async payload() {
        await Axios.put(`/api/courses/${courseId}/nodes/${pointId}/contents/exams/${examId}/pause`);
        const exams = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/exams`, {params: {size: 2000}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        return exams.courseExamInfos;
    }
});

export const getExamDetails = (examId) => ({
    type: TYPES.ASYNC_LOAD_EXAM_DETAILS,
    payload: () => Axios.get(`/api/exams/${examId}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getExamUserList = (pointId, examId) => ({
    type: TYPES.ASYNC_LOAD_EXAM_USER_LIST,
    payload: () => Axios.get('/api/users/ALL/exams', {params: {relativeId: pointId, examId}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});
