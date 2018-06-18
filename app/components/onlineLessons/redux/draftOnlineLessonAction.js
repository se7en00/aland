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

export const createPoint = (lessonId, sectionId, points) => ({
    type: TYPES.ASYNC_CREATE_POINTS,
    async payload() {
        try {
            await Axios.post(`/api/courseNodes/sections/${sectionId}/points`, {subjects: Object.values(points)})
                .then(response => response?.data);
            const getALLNodes = await Axios.get(`/api/courseNodes/courses/${lessonId}`)
                .then(response => response?.data);
            return getALLNodes;
        } catch (error) {
            return Promise.reject(error);
        }
    }
});

export const getCourseDetails = (lessonId) => ({
    type: TYPES.ASYNC_LOAD_ONLINE_LESSON_DETAILS,
    async payload() {
        let sections;
        const course = await Axios.get(`/api/courses/${lessonId}`).then(response => response.data);
        const result = {draftLesson: course, isEditable: true};
        const chapters = await Axios.get(`/api/courseNodes/courses/${lessonId}/chapters`).then(response => response.data);
        if (chapters.length > 0) {
            Object.assign(result, {chapters});
            const sectionsPromise = chapters.map(chapter => Axios.get(`/api/courseNodes/chapters/${chapter.id}/sections`)
                .then(response => ({[chapter.id]: response?.data}))
                .catch(() => ({[chapter.id]: []}))
            );
            sections = await Promise.all(sectionsPromise).then(response => (Object.assign({}, ...response)));
            if (!R.isEmpty(sections)) {
                Object.assign(result, {sections});
            }
        }
        const allNodes = await Axios.get(`/api/courseNodes/courses/${lessonId}`)
            .then(response => response?.data);
        if (allNodes.length > 0) {
            Object.assign(result, {allNodes});
        }
        return result;
    }
});

export const removePoint = (lessonId, point) => ({
    type: TYPES.ASYNC_REMOVE_POINTS,
    async payload() {
        try {
            await Axios.delete(`/api/courseNodes/sections/${point.sectionId}/points/${point.pointId}`);
            const allNodes = await Axios.get(`/api/courseNodes/courses/${lessonId}`).then(response => response?.data);
            return allNodes;
        } catch (error) {
            return Promise.reject(error?.response?.data);
        }
    }
});

export const createChapters = (lessonId, chapters) => ({
    type: TYPES.ASYNC_CREATE_CHAPTERS,
    async payload() {
        try {
            const course = lessonId ? {id: lessonId} : Axios.post('/api/courses', {}).then(response => response.data);
            const initCourse = await course;
            const chaptersElements = await Axios.post(`/api/courseNodes/courses/${initCourse.id}/chapters`, {subjects: Object.values(chapters)})
                .then(response => response?.data);
            const hasCreateNewCourse = Object.prototype.hasOwnProperty.call(initCourse, 'name');
            return Object.assign({chaptersElements}, hasCreateNewCourse ? {draftLesson: initCourse} : {});
        } catch (error) {
            return Promise.reject(error);
        }
    }
});

export const createSections = (chapterId, sections) => ({
    type: TYPES.ASYNC_CREATE_SECTIONS,
    payload: () => Axios.post(`/api/courseNodes/chapters/${chapterId}/sections`, {subjects: Object.values(sections)})
        .then(response => ({[chapterId]: response?.data}))
        .catch(error => Promise.reject(error?.response?.data))
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
