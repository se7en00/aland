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
        const pedias = await Axios.get('/api/pedias', {params: {size: 1000}}).then(response => response.data);
        //build
        result = {pointContent, pedias, type: pointContent.type || 'ARTICLE'};
        //if it's pediaInfo， load the part of pediaInfo
        if (pointContent && pointContent.type === 'PEDIA') {
            const pediaInfo = await Axios.get(`/api/pedias/${pointContent.link}`).then(response => response.data);
            pointContent.pediaSubject = pediaInfo.subject;
            result = Object.assign(result, { selectedPedia: pediaInfo});
        }
        //load material list
        if (pointContent && pointContent.type === 'MEDIA') {
            const materialInfo = await Axios.get(`/api/multimedias/${pointContent.link}`).then(response => response.data);
            result = Object.assign(result, {selectedMaterial: materialInfo});
        }

        //load homework
        const homeWorks = await Axios.get(`/api/courses/${courseId}/nodes/${pointId}/contents/works`, {params: {size: 1000}})
            .then(response => response.data)
            .catch((error) => Promise.reject(error?.response?.data));
        if (homeWorks) {
            result = Object.assign(result, {homeWorks});
        }
        return result;
    }
});

export const switchStudyContentType = (type = 'ARTICLE') => ({
    type: TYPES.SYNC_CHANGE_STUDY_CONTENTS_TYPE,
    payload: type
});

export const getSelectedMaterial = (material) => ({
    type: TYPES.SYNC_GET_SELECTED_MATERIAL,
    payload: material
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