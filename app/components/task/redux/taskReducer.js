import typeToReducer from 'type-to-reducer';
import * as TYPES from './taskActionTypes';

//reducer
const taskReducer = typeToReducer({

    [TYPES.ASYNC_LOAD_TASKS_LIST]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            list: action.payload
        })
    },
    [TYPES.SYNC_TASK_LIST_SEARCH_PARAMS]: (state, action) => ({
        ...state,
        searchParams: action.payload
    }),
    [TYPES.GET_TASK_MANAGERS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            userManagers: action.payload
        })
    },
    //新增用户
    [TYPES.ASYNC_CREATE_TASK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state,
            taskDetails: action.payload
        })
    },

    [TYPES.ASYNC_UPDATE_TASK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_DELETE_TASK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },
    [TYPES.ASYNC_LOAD_DIRECTIONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            directions: action.payload
        })
    },

    [TYPES.ASYNC_TASK_ASSOCIATIONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            associations: action.payload
        })
    },

    //details
    [TYPES.ASYNC_LOAD_TASK_DETAILS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            taskDetails: action.payload.taskDetails,
            isEditable: action.payload.isEditable
        })
    },

    [TYPES.SYNC_RESET_TASK]: (state, action) => ({
        ...state,
        taskDetails: action.payload,
        isEditable: action.payload
    }),

    [TYPES.ASYNC_LOAD_RELATED_LESSONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            ...action.payload
        })
    },

    [TYPES.ASYNC_LOAD_RELATED_ONLINELESSONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            onlineLessons: action.payload
        })
    },

    [TYPES.ASYNC_LOAD_RELATED_ONECLICK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            oneClicks: action.payload
        })
    },

    //搜索
    [TYPES.SYNC_SEARCH_PARAMS]: (state, action) => ({
        ...state,
        searchParams: action.payload
    }),

    [TYPES.SYNC_SELECTED_LESSONS]: (state, action) => ({
        ...state,
        ...action.payload
    }),

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

    [TYPES.ASYNC_SAVE_TASK_LESSONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            taskDetails: action.payload
        })
    }

}, {});

export default taskReducer;
