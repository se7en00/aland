import { Axios } from 'utils';
import * as TYPES from './actionTypes';


export const createDraftOnlineLesson = (courseID, courseUpdate) => ({
    type: TYPES.CREATE_INITIAL_ONLINE_LESSONS,
    async payload() {
        const course = courseID ? {id: courseID} : Axios.post('/api/courses', {}).then(response => response.data);
        const initCourse = await course;
        const updateCourse = await Axios.put(`/api/courses/${initCourse.id}`, courseUpdate)
            .then(response => response.data)
            .catch(error => Promise.reject(error?.response?.data));
        return updateCourse;
    }
});

export const createPoint = (lessonId, chapter, section, points) => ({
    type: TYPES.ASYNC_CREATE_POINTS,
    async payload() {
        const course = lessonId ? {id: lessonId} : Axios.post('/api/courses', {}).then(response => response.data);
        const initCourse = await course;
        const chapterElement = await Axios.post(`/api/courseNodes/courses/${initCourse.id}/chapters`, {subjects: [chapter]})
            .then(response => response?.data[0]);
        const sectionElement = await Axios.post(`/api/courseNodes/chapters/${chapterElement.id}/sections`, {subjects: [section]})
            .then(response => response?.data[0]);
        const pointElement = await Axios.post(`/api/courseNodes/sections/${sectionElement.id}/points`, {subjects: Object.values(points)})
            .then(response => response?.data);
        const hasNameAttr = Object.prototype.hasOwnProperty.call(initCourse, 'name');
        const pointElements = {chapter: chapterElement, section: sectionElement, points: pointElement, lessonId: initCourse.id };
        return Object.assign({pointElements}, hasNameAttr ? {draftLesson: initCourse} : {});
    }
});

export const removePoint = (point) => ({
    type: TYPES.ASYNC_REMOVE_POINTS,
    payload: () => Axios.delete(`/api/courseNodes/sections/${point.sectionId}/points/${point.pointId}`)
        .then(() => point)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createChapters = (subjects) => ({
    type: TYPES.SYNC_CREATE_CHAPTERS,
    payload: Object.values(subjects)
});

export const createSections = (chapter, sections) => ({
    type: TYPES.SYNC_CREATE_SECTIONS,
    payload: {[chapter]: Object.values(sections)}
});

export const getCategories = () => ({
    type: TYPES.LOAD_ONLINE_LESSONS_CATEGORIES,
    payload: () => Axios.get('/api/dictionarys/dicType/CATEGORY')
        .then(response => {
            const { data = [] } = response;
            return data.map(item => ({name: item.name, code: item.code}));
        })
        .catch(error => Promise.reject(error?.response?.data))
});

export const resetDraftLessons = () => ({
    type: TYPES.SYNC_RESET_INITIAL_ONLINE_LESSONS,
    payload: null
});
