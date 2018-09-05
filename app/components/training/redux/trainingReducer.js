import typeToReducer from 'type-to-reducer';
import * as TYPES from './trainingActionTypes';

//reducer
const trainingReducer = typeToReducer({

    [TYPES.ASYNC_LOAD_TRAINING_LIST]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            list: action.payload
        })
    },
    //新增用户
    [TYPES.ASYNC_CREATE_TRAINING]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state,
            trainingDetails: action.payload
        })
    },

    [TYPES.ASYNC_UPDATE_TRAINING]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_DELETE_TRAINING]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_PUBLISH_TRAINING]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_CLOSE_TRAINING]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.SYNC_TRAINING_LIST_SEARCH_PARAMS]: (state, action) => ({
        ...state,
        searchParams: action.payload
    }),

    [TYPES.ASYNC_LOAD_TRAINING_ASSOCIATIONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            associations: action.payload
        })
    },

    [TYPES.ASYNC_LOAD_TRAINING_DETAILS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            trainingDetails: action.payload.trainingDetails,
            isEditable: action.payload.isEditable,
            lessons: action.payload.lessons,
            users: action.payload.users,
            exams: action.payload.exams,
            tusers:action.payload.tusers
        })
    },

    [TYPES.SYNC_RESET_TRAININGS]: (state, action) => ({
        ...state,
        trainingDetails: action.payload,
        isEditable: action.payload,
        lessons: action.payload,
        users: action.payload,
        exams: action.payload
    }),


    [TYPES.ASYNC_UPDATE_TRAINING_EXAMS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            trainingDetails: action.payload
        })
    },

    [TYPES.ASYNC_LOAD_TRAINING_USER_LIST]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            users: action.payload
        })
    },


    [TYPES.ASYNC_CHECK_IN_TRAINING_USER]: (state, action) => ({
        ...state,
        users: action.payload
    }),

    [TYPES.ASYNC_SAVE_TRAINING_LESSON]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            lessons: action.payload
        })
    },

    [TYPES.ASYNC_DELETE_TRAINING_LESSON]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            lessons: action.payload
        })
    },

    [TYPES.ASYNC_LOAD_TRAINING_LESSON_DETAILS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            lessonDetails: action.payload
        })
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

    [TYPES.ASYNC_SAVE_SELECTED_LIB_EXAMS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            exams: action.payload
        })
    },

    [TYPES.ASYNC_CREATE_CUSTOMIZE_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            exams: action.payload
        })
    },

    [TYPES.ASYNC_START_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            exams: action.payload
        })
    },


    [TYPES.ASYNC_PAUSE_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            exams: action.payload
        })
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

    [TYPES.ASYNC_DELETE_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            exams: action.payload
        })
    },

    [TYPES.SYNC_GET_SELECTED_LIB_EXAMS]: (state, action) => ({
        ...state,
        selectedLibExams: action.payload
    }),


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

export default trainingReducer;
