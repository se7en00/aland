import typeToReducer from 'type-to-reducer';
import * as TYPES from './newsActionType';

//reducer
const newsReducer = typeToReducer({
    //列表
    [TYPES.ASYNC_LOAD_NEWS_LIST]: {
        REJECTED: (state, action) => ({
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            list: action.payload
        })
    },
    //搜索
    [TYPES.SYNC_NEWS_LIST_SEARCH_PARAMS]: (state, action) => ({
        ...state,
        searchParams: action.payload
    }),

    [TYPES.ASYNC_DELETE_NEWS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_LOAD_DEPARTMENTS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            departments: action.payload
        })
    },
    [TYPES.ASYNC_ADD_NEWS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },
    [TYPES.ASYNC_GET_NEWS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            news: action.payload
        })
    },
    [TYPES.ASYNC_EDIT_NEWS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },
    [TYPES.ASYNC_GET_NEWS_COMMENTS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            comments: action.payload
        })
    },
    [TYPES.ASYNC_TOGGLE_COMMENT_STATUS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },
    [TYPES.ASYNC_TOGGLE_STATUS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },
    [TYPES.ASYNC_GET_USERGROUPS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            userGroups: action.payload
        })
    }
}, {});

export default newsReducer;
