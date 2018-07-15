import { Axios, paginationSetting } from 'utils';
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
        //get exams
        const exams = await Axios.get(`/api/courses/${lessonId}/exams`)
            .then(response => response.data);
        if (exams.length > 0) {
            Object.assign(result, {exams});
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

export const examAllowCourse = (checked) => ({
    type: TYPES.SYNC_SWITCH_COURSE_EXAM,
    payload: checked
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

export const saveSelectedLibExams = (courseId, selectedLibExams) => dispatch => {
    const allPromis = selectedLibExams.map(libExam =>
        Axios.put(`/api/courses/${courseId}/exams/${libExam.id}`)
            .then(response => response.data)
            .catch(error => error?.response?.data));
    return dispatch({
        type: TYPES.ASYNC_SAVE_SELECTED_LIB_EXAMS,
        async payload() {
            await Promise.all(allPromis);
            const exams = await Axios.get(`/api/courses/${courseId}/exams`, {params: {size: 2000}})
                .then(response => response.data);
            return exams;
        }
    });
};

export const deleteExam = (courseId, examId) => ({
    type: TYPES.ASYNC_DELETE_EXAM,
    payload: () => Axios.delete(`/api/courses/${courseId}/exams/${examId}`)
        .then(() => examId)
        .catch(error => Promise.reject(error?.response?.data))
});


export const createCustomizeExam = (courseId, params) => ({
    type: TYPES.ASYNC_CREATE_CUSTOMIZE_EXAM,
    async payload() {
        const newExam = await Axios.post('/api/exams', params)
            .then(response => response.data);
        await Axios.put(`/api/courses/${courseId}/exams/${newExam.id}`)
            .then(response => response.data);
        const exams = await Axios.get(`/api/courses/${courseId}/exams`, {params: {size: 2000}})
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

export const getExamUserList = (courseId, examId) => ({
    type: TYPES.ASYNC_LOAD_EXAM_USER_LIST,
    payload: () => Axios.get('/api/users/ALL/exams', {params: {relativeId: courseId, examId}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});
