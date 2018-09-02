import typeToReducer from 'type-to-reducer';
import * as TYPES from './noticesActionType';

//reducer
const noticesReducer = typeToReducer({
    //列表
    [TYPES.ASYNC_LOAD_NOTICES_LIST]: {
        REJECTED: (state, action) => ({
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            list: action.payload
        })
    },
    //搜索
    [TYPES.SYNC_NOTICES_LIST_SEARCH_PARAMS]: (state, action) => ({
        ...state,
        searchParams: action.payload
    }),

    [TYPES.ASYNC_DELETE_NOTICE]: {
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
    [TYPES.ASYNC_ADD_NOTICE]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },
    [TYPES.ASYNC_GET_NOTICE]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            notice: action.payload
        })
    },
    [TYPES.ASYNC_EDIT_NOTICE]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },
    [TYPES.ASYNC_GET_NOTICE_COMMENTS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            comments: action.payload
        })
    },
    [TYPES.ASYNC_GET_NOTICE_RECEIVERS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            comments: action.payload
        })
    },
    [TYPES.ASYNC_GET_NOTICE_JOINS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            comments: action.payload
        })
    },
    [TYPES.ASYNC_GET_NOTICE_KNOWS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            comments: action.payload
        })
    },
    [TYPES.ASYNC_GET_NOTICE_LIKES]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            comments: action.payload
        })
    },
    [TYPES.ASYNC_GET_NOTICE_INQUIRYS]: {
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

export default noticesReducer;
