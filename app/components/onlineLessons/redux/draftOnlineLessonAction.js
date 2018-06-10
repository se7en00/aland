import { Axios } from 'utils';
import * as TYPES from './actionTypes';


export const createInitialOnlineLesson = () => ({
    type: TYPES.CREATE_INITIAL_ONLINE_LESSONS,
    payload: () => Axios.post('/api/courses', {})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createPoint = (lessonId, chapter, section, points) => ({
    type: TYPES.ASYNC_CREATE_POINTS,
    async payload() {
        const chapterElement = await Axios.post(`/api/courseNodes/courses/${lessonId}/chapters`, {subjects: [chapter]})
            .then(response => response?.data[0]);
        const sectionElement = await Axios.post(`/api/courseNodes/chapters/${chapterElement.id}/sections`, {subjects: [section]})
            .then(response => response?.data[0]);
        await Axios.post(`/api/courseNodes/sections/${sectionElement.id}/points`, {subjects: Object.values(points)})
            .then(response => response?.data[0]);
        return {chapter, section, points: Object.values(points), lessonId };
    }
});

export const createChapters = (subjects) => ({
    type: TYPES.SYNC_CREATE_CHAPTERS,
    payload: Object.values(subjects)
});

export const createSections = (chapter, sections) => ({
    type: TYPES.SYNC_CREATE_SECTIONS,
    payload: {[chapter]: Object.values(sections)}
});
