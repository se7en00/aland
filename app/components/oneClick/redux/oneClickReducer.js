import typeToReducer from 'type-to-reducer';
import * as TYPES from './oneClickActionTypes';

export default typeToReducer({
    //线上课程列表
    [TYPES.LOAD_ONE_CLICK_LIST]: {
        REJECTED: (state, action) => ({
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            list: action.payload
        })
    },
    [TYPES.ADD_ONE_CLICK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },
    [TYPES.LOAD_CATEGORIES]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            categoryList: action.payload
        })
    },
    [TYPES.SET_CURRENT_TAGS]: (state, action) => ({
        ...state,
        currentTags: action.payload
    }),
    [TYPES.GET_ONE_CLICK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            oneClick: action.payload
        })
    },
    [TYPES.EDIT_ONE_CLICK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            oneClick: action.payload
        })
    }
}, {});
