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
    //新增用户
    [TYPES.ASYNC_CREATE_TASK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state,
            createTask: action.payload
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
    [TYPES.ASYNC_LOAD_COURSES]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            onlineLessons: action.payload
        })
    },
    [TYPES.ASYNC_LOAD_PEDIAS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            oneClicks: action.payload
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
    }
}, {});

export default taskReducer;
