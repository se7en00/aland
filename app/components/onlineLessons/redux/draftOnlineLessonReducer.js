import typeToReducer from 'type-to-reducer';
import * as TYPES from './actionTypes';

export default typeToReducer({
    //新建
    [TYPES.CREATE_INITIAL_ONLINE_LESSONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            draftLesson: action.payload
        })
    },

    //详情
    [TYPES.ASYNC_LOAD_ONLINE_LESSON_DETAILS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            draftLesson: action.payload.draftLesson,
            isEditable: action.payload.isEditable,
            chapters: action.payload.chapters,
            sections: action.payload.sections,
            allNodes: action.payload.allNodes,
            exams: action.payload.exams
        })
    },
    //新建点
    [TYPES.ASYNC_CREATE_POINTS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            allNodes: action.payload
        })
    },

    [TYPES.ASYNC_REMOVE_POINTS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            allNodes: action.payload
        })
    },

    //重置
    [TYPES.SYNC_RESET_INITIAL_ONLINE_LESSONS]: (state, action) => ({
        ...state,
        draftLesson: action.payload,
        chapters: action.payload,
        sections: action.payload,
        isEditable: action.payload,
        allNodes: action.payload,
        exams: action.payload
    }),

    [TYPES.LOAD_ONLINE_LESSONS_CATEGORIES]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            categoryList: action.payload
        })
    },

    [TYPES.ASYNC_CREATE_CHAPTERS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            const result = action.payload;
            let chapters;
            if (state?.chapters) {
                chapters = [...state.chapters, ...action.payload.chaptersElements];
            } else {
                chapters = action.payload.chaptersElements;
            }
            const hasDraftLessonAttr = Object.prototype.hasOwnProperty.call(result, 'draftLesson');
            return Object.assign(state, {chapters}, hasDraftLessonAttr ? { draftLesson: result.draftLesson} : {});
        }
    },

    [TYPES.ASYNC_CREATE_SECTIONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            let sections;
            if (state?.sections) {
                sections = R.mergeWith(R.concat, state.sections, action.payload);
            } else {
                sections = action.payload;
            }
            return {
                ...state,
                sections
            };
        }
    },

    [TYPES.SYNC_SWITCH_COURSE_EXAM]: (state, action) => ({
        ...state,
        enableCourseExam: action.payload
    }),

    [TYPES.ASYNC_LOAD_LIB_EXAMS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            libExams: action.payload
        })
    },

    [TYPES.SYNC_GET_SELECTED_LIB_EXAMS]: (state, action) => ({
        ...state,
        selectedLibExams: action.payload
    }),

    [TYPES.ASYNC_SAVE_SELECTED_LIB_EXAMS]: {
        FULFILLED: (state, action) => {
            state.exams = action.payload;
            return {...state};
        }
    },

    [TYPES.ASYNC_DELETE_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            const examId = action.payload;
            if (state?.exams && state?.exams.length) {
                state.exams = state.exams.filter(exam => exam.examId !== examId);
            }
            return {...state};
        }
    },

    [TYPES.ASYNC_CREATE_CUSTOMIZE_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({...state, exams: action.payload})
    },

    [TYPES.ASYNC_LOAD_EXAM_DETAILS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            questionDetails: action.payload
        })
    },

    [TYPES.ASYNC_LOAD_EXAM_USER_LIST]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            userList: action.payload
        })
    }

}, {});
