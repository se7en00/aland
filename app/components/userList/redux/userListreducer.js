import typeToReducer from 'type-to-reducer';
import * as TYPES from './userListActionType';

//reducer
const userReducer = typeToReducer({
    //用户列表
    [TYPES.ASYNC_LOAD_USER_LIST]: {
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
    [TYPES.ASYNC_CREATE_USER]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state,
            creationUser: action.payload
        })
    },

    [TYPES.ASYNC_UPDATE_USER]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    //搜索
    [TYPES.SYNC_USER_LIST_SEARCH_PARAMS]: (state, action) => ({
        ...state,
        searchParams: action.payload
    }),

    [TYPES.ASYNC_DELETE_USER]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_LOAD_USERS_ASSOCIATIONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            associations: action.payload
        })
    },

    [TYPES.ASYNC_USER_DETAILS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            userDetails: action.payload
        })
    }

}, {});


export default userReducer;
