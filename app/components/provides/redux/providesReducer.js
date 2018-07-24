import typeToReducer from 'type-to-reducer';
import * as TYPES from './providesActionType';

//reducer
const materialsReducer = typeToReducer({
    //列表
    [TYPES.ASYNC_LOAD_PROVIDES_LIST]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            list: action.payload
        })
    },
    //搜索
    [TYPES.SYNC_PROVIDES_LIST_SEARCH_PARAMS]: (state, action) => ({
        ...state,
        searchParams: action.payload
    }),

    [TYPES.ASYNC_DELETE_PROVIDE]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },
    [TYPES.ASYNC_GET_PROVIDE]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            provide: action.payload
        })
    },
    [TYPES.ASYNC_ADD_PROVIDE]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },
    [TYPES.ASYNC_EDIT_PROVIDE]: {
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
    [TYPES.SET_CURRENT_PROVIDE]: (state, action) => ({
        ...state,
        provide: action.payload
    }),
    [TYPES.EXPORT_PROVIDES]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },
    [TYPES.ASYNC_GET_INQUIRYS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            inquirys: action.payload
        })
    },
    [TYPES.ASYNC_RATE_PROVIDE]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    }
}, {});

export default materialsReducer;
