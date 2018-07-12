import typeToReducer from 'type-to-reducer';
import * as TYPES from './actionTypes';

export default typeToReducer({

    [TYPES.SYNC_CHANGE_STUDY_CONTENTS_TYPE]: (state, action) => ({
        ...state,
        type: action.payload
    }),

    [TYPES.ASYNC_LOAD_POINT_CONTENT]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            ...action.payload
        })
    },

    [TYPES.ASYNC_SAVE_POINT_STUDY_CONTENT]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            pointContent: action.payload
        })
    },

    [TYPES.ASYNC_LOAD_MATERIALS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            materials: action.payload
        })
    },

    [TYPES.SYNC_GET_SELECTED_MATERIAL]: (state, action) => ({
        ...state,
        selectedMaterial: action.payload
    }),

    [TYPES.SYNC_REMOVE_SELECTED_MATERIAL]: (state, action) => ({
        ...state,
        selectedMaterial: action.payload
    }),

    // [TYPES.SYNC_EDIT_HOME_WORK]: (state, action) => ({
    //     ...state,
    //     editHomeWork: action.payload
    // }),

    [TYPES.SYNC_EDIT_HOME_WORK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            console.log(action.payload);
            return {
                ...state,
                editHomeWork: action.payload
            };
        }
    },

    [TYPES.ASYNC_DELETE_HOME_WORK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            const homeWorkId = action.payload;
            if (state?.homeWorks?.elements && state?.homeWorks?.elements.length) {
                state.homeWorks.elements = state.homeWorks.elements.filter(homeWork => homeWork.id !== homeWorkId);
            }
            return {...state};
        }
    },

    [TYPES.ASYNC_SAVE_HOME_WORK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => Object.assign(state, {homeWorks: action.payload})
    },

    [TYPES.ASYNC_SAVE_INTERACTION_HOME_WORK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => Object.assign(state, {homeWorks: action.payload})
    },

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

    [TYPES.ASYNC_DELETE_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            const examId = action.payload;
            if (state?.exams?.courseExamInfos && state?.exams?.courseExamInfos.length) {
                state.exams.courseExamInfos = state.exams.courseExamInfos.filter(exam => exam.examId !== examId);
            }
            return {...state};
        }
    },

    [TYPES.ASYNC_SAVE_SELECTED_LIB_EXAMS]: {
        FULFILLED: (state, action) => {
            if (state?.exams) {
                state.exams.courseExamInfos = action.payload;
            }
            return {...state};
        }
    },

    [TYPES.ASYNC_LOAD_CATEGORIES]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            categoryList: action.payload
        })
    },

    [TYPES.ASYNC_UPDATE_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            if (state.exams) {
                const {examOn, examAmount, examPassRate} = action.payload;
                Object.assign(state.exams, {examOn, examAmount, examPassRate});
            }
            return {
                ...state
            };
        }
    },

    [TYPES.ASYNC_CREATE_CUSTOMIZE_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            if (state?.exams) {
                state.exams.courseExamInfos = action.payload;
            }
            return {...state};
        }
    },

    [TYPES.ASYNC_START_EXAM]: {
        FULFILLED: (state, action) => {
            if (state?.exams) {
                state.exams.courseExamInfos = action.payload;
            }
            return {...state};
        }
    },

    [TYPES.ASYNC_PAUSE_EXAM]: {
        FULFILLED: (state, action) => {
            if (state?.exams) {
                state.exams.courseExamInfos = action.payload;
            }
            return {...state};
        }
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
