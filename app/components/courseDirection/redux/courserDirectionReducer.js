import typeToReducer from 'type-to-reducer';
import * as TYPES from './courseDirectionActionTypes';

//reducer
const userReducer = typeToReducer({
    //用户列表
    [TYPES.ASYNC_LOAD_COURSE_DIRECTION_LIST]: {
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
    [TYPES.ASYNC_CREATE_COURSE_DIRECTION]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state,
            createCourseDirection: action.payload
        })
    },

    [TYPES.ASYNC_UPDATE_COURSE_DIRECTION]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_DELETE_COURSE_DIRECTION]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_COURSE_DIRECTION_DETAILS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            courseDirectionDetails: action.payload
        })
    },

    [TYPES.SYNC_CLEAR_COURSE_DIRECTION_DETAILS]: (state, action) => ({
        ...state,
        courseDirectionDetails: action.payload
    })
}, {});


export default userReducer;
