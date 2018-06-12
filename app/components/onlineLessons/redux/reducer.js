import typeToReducer from 'type-to-reducer';
import * as TYPES from './actionTypes';

export default typeToReducer({
    //线上课程列表
    [TYPES.LOAD_ONLINE_LESSONS_LIST]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            list: action.payload
        })
    },

    [TYPES.ASYNC_REMOVE_COURSE]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.SYNC_ONLINE_LESSONS_SEARCH_PARAMS]: (state, action) => ({
        ...state,
        searchParams: action.payload
    })
}, {});
